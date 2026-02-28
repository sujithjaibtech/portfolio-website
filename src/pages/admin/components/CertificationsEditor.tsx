import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Trash2, Pencil, Check, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableCertItemProps {
    id: string;
    cert: any;
    onEdit: (cert: any) => void;
    onDelete: (id: string) => void;
}

function SortableCertItem({ id, cert, onEdit, onDelete }: SortableCertItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-xl bg-secondary/20 ${isDragging ? 'opacity-50 shadow-lg' : ''}`}>
            <div className="flex items-center gap-3">
                <button {...attributes} {...listeners} className="p-1.5 text-muted-foreground hover:bg-secondary rounded-md cursor-grab active:cursor-grabbing shrink-0">
                    <GripVertical size={16} />
                </button>
                <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.year}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => onEdit(cert)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => onDelete(cert.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}

export default function CertificationsEditor() {
    const [certifications, setCertifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [year, setYear] = useState('');
    const [link, setLink] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        fetchCertifications();
    }, []);

    const fetchCertifications = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .order('order_index', { ascending: true });

        if (!error && data) setCertifications(data);
        setLoading(false);
    };

    const resetForm = () => {
        setName('');
        setIssuer('');
        setYear('');
        setLink('');
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (cert: any) => {
        setName(cert.name);
        setIssuer(cert.issuer);
        setYear(cert.year);
        setLink(cert.link || '');
        setEditingId(cert.id);
        setIsAdding(false);
    };

    const handleSave = async () => {
        if (!name || !issuer) return;

        const payload = {
            name,
            issuer,
            year,
            link: link.trim() || undefined
        };

        if (editingId) {
            await supabase.from('certifications').update(payload).eq('id', editingId);
        } else {
            const maxOrder = certifications.length > 0 ? Math.max(...certifications.map(e => e.order_index)) : -1;
            await supabase.from('certifications').insert([{ ...payload, order_index: maxOrder + 1 }]);
        }

        resetForm();
        fetchCertifications();
        toast.success(editingId ? 'Certification updated successfully!' : 'Certification added successfully!');
    };

    const handleDelete = (id: string) => {
        toast('Confirm Deletion', {
            description: 'Are you sure you want to delete this certification?',
            action: {
                label: 'Delete',
                onClick: async () => {
                    await supabase.from('certifications').delete().eq('id', id);
                    fetchCertifications();
                    toast.success('Certification deleted successfully!');
                }
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { }
            }
        });
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = certifications.findIndex((item) => item.id === active.id);
            const newIndex = certifications.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(certifications, oldIndex, newIndex);
            setCertifications(newOrder);

            const updates = newOrder.map((item, index) => ({
                id: item.id,
                order_index: index
            }));

            for (const update of updates) {
                await supabase.from('certifications').update({ order_index: update.order_index }).eq('id', update.id);
            }
        }
    };

    if (loading && certifications.length === 0) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Certifications...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Certifications</h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                        <Plus size={16} /> Add Cert
                    </button>
                )}
            </div>

            {/* List View */}
            {!isAdding && !editingId && (
                <div className="space-y-4">
                    {certifications.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-8">No certification entries found.</p>
                    ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={certifications.map(e => e.id)} strategy={verticalListSortingStrategy}>
                                {certifications.map((cert) => (
                                    <SortableCertItem key={cert.id} id={cert.id} cert={cert} onEdit={handleEdit} onDelete={handleDelete} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            )}

            {/* Editor Form View */}
            {(isAdding || editingId) && (
                <div className="border rounded-xl p-6 bg-background space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Certification Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. AWS Certified Developer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Issuer</label>
                            <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. Amazon Web Services" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Year</label>
                            <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. 2024" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL / Link to verify</label>
                            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="https://..." />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button onClick={resetForm} className="px-4 py-2 border rounded-md hover:bg-secondary text-sm font-medium">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                            <Check size={16} /> Save Cert
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
