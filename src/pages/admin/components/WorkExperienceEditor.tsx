import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Trash2, Pencil, Check, X, GripVertical } from 'lucide-react';
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

interface SortableItemProps {
    id: string;
    exp: any;
    onEdit: (exp: any) => void;
    onDelete: (id: string) => void;
}

function SortableExperienceItem({ id, exp, onEdit, onDelete }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

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
                    <h3 className="font-semibold">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => onEdit(exp)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => onDelete(exp.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}

export default function WorkExperienceEditor() {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [period, setPeriod] = useState('');
    const [responsibilities, setResponsibilities] = useState<string[]>(['']);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('work_experience')
            .select('*')
            .order('order_index', { ascending: true });

        if (!error && data) {
            setExperiences(data);
        }
        setLoading(false);
    };

    const resetForm = () => {
        setTitle('');
        setCompany('');
        setLocation('');
        setPeriod('');
        setResponsibilities(['']);
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (exp: any) => {
        setTitle(exp.title);
        setCompany(exp.company);
        setLocation(exp.location);
        setPeriod(exp.period);
        setResponsibilities(exp.responsibilities.length ? [...exp.responsibilities] : ['']);
        setEditingId(exp.id);
        setIsAdding(false);
    };

    const handleSave = async () => {
        const cleanResps = responsibilities.filter(r => r.trim() !== '');

        const payload = {
            title,
            company,
            location,
            period,
            responsibilities: cleanResps
        };

        if (editingId) {
            await supabase.from('work_experience').update(payload).eq('id', editingId);
        } else {
            const maxOrder = experiences.length > 0 ? Math.max(...experiences.map(e => e.order_index)) : -1;
            await supabase.from('work_experience').insert([{ ...payload, order_index: maxOrder + 1 }]);
        }

        resetForm();
        fetchExperiences();
        toast.success(editingId ? 'Experience updated successfully!' : 'Experience added successfully!');
    };

    const handleDelete = (id: string) => {
        toast('Confirm Deletion', {
            description: 'Are you sure you want to delete this experience?',
            action: {
                label: 'Delete',
                onClick: async () => {
                    await supabase.from('work_experience').delete().eq('id', id);
                    fetchExperiences();
                    toast.success('Experience deleted successfully!');
                }
            },
            cancel: {
                label: 'Cancel',
                onClick: () => { }
            }
        });
    };

    const handleRespChange = (index: number, value: string) => {
        const newResps = [...responsibilities];
        newResps[index] = value;
        setResponsibilities(newResps);
    };

    const addRespField = () => setResponsibilities([...responsibilities, '']);

    const removeRespField = (index: number) => {
        const newResps = responsibilities.filter((_, i) => i !== index);
        setResponsibilities(newResps.length ? newResps : ['']);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = experiences.findIndex((item) => item.id === active.id);
            const newIndex = experiences.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(experiences, oldIndex, newIndex);

            // Optimistic update
            setExperiences(newOrder);

            // Update database with new order indices
            const updates = newOrder.map((item, index) => ({
                id: item.id,
                order_index: index
            }));

            for (const update of updates) {
                await supabase.from('work_experience').update({ order_index: update.order_index }).eq('id', update.id);
            }
        }
    };

    if (loading && experiences.length === 0) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Work Experience...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                        <Plus size={16} /> Add New
                    </button>
                )}
            </div>

            {/* List View */}
            {!isAdding && !editingId && (
                <div className="space-y-4">
                    {experiences.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-8">No experience entries found.</p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={experiences.map(e => e.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {experiences.map((exp) => (
                                    <SortableExperienceItem
                                        key={exp.id}
                                        id={exp.id}
                                        exp={exp}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
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
                            <label className="block text-sm font-medium mb-1">Job Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. Senior Developer" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. Google" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. New York, USA" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Period</label>
                            <input type="text" value={period} onChange={e => setPeriod(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. Jan 2022 - Present" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Responsibilities (Bullet Points)</label>
                        <div className="space-y-2">
                            {responsibilities.map((resp, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={resp}
                                        onChange={e => handleRespChange(i, e.target.value)}
                                        className="flex-1 px-3 py-2 border rounded-md bg-transparent"
                                        placeholder="e.g. Developed key feature X..."
                                    />
                                    <button onClick={() => removeRespField(i)} className="p-2 text-muted-foreground hover:text-red-600 rounded-md border border-transparent hover:border-red-200 hover:bg-red-50"><X size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addRespField} className="mt-2 text-sm text-primary font-medium hover:underline">+ Add another bullet point</button>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button onClick={resetForm} className="px-4 py-2 border rounded-md hover:bg-secondary text-sm font-medium">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                            <Check size={16} /> Save Experience
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
