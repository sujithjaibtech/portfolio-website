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
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableTechItemProps {
    id: string;
    item: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
}

function SortableTechItem({ id, item, onEdit, onDelete }: SortableTechItemProps) {
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
        <div ref={setNodeRef} style={style} className={`flex items-center justify-between p-3 border rounded-xl bg-secondary/20 ${isDragging ? 'opacity-50 shadow-lg' : ''}`}>
            <div className="flex items-center gap-2 overflow-hidden">
                <button {...attributes} {...listeners} className="p-1.5 text-muted-foreground hover:bg-secondary rounded-md cursor-grab active:cursor-grabbing shrink-0">
                    <GripVertical size={14} />
                </button>
                <span className="font-medium text-sm truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"><Pencil size={14} /></button>
                <button onClick={() => onDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={14} /></button>
            </div>
        </div>
    );
}

export default function TechStackEditor() {
    const [stack, setStack] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [name, setName] = useState('');

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
        fetchTechStack();
    }, []);

    const fetchTechStack = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('tech_stack')
            .select('*')
            .order('order_index', { ascending: true });

        if (!error && data) {
            setStack(data);
        }
        setLoading(false);
    };

    const resetForm = () => {
        setName('');
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (item: any) => {
        setName(item.name);
        setEditingId(item.id);
        setIsAdding(false);
    };

    const handleSave = async () => {
        if (!name.trim()) return;

        const payload = {
            name: name.trim()
        };

        if (editingId) {
            await supabase.from('tech_stack').update(payload).eq('id', editingId);
        } else {
            const maxOrder = stack.length > 0 ? Math.max(...stack.map(e => e.order_index)) : -1;
            await supabase.from('tech_stack').insert([{ ...payload, order_index: maxOrder + 1 }]);
        }

        resetForm();
        fetchTechStack();
        toast.success(editingId ? 'Tech item updated successfully!' : 'Tech item added successfully!');
    };

    const handleDelete = (id: string) => {
        toast('Confirm Deletion', {
            description: 'Are you sure you want to remove this tech?',
            action: {
                label: 'Remove',
                onClick: async () => {
                    await supabase.from('tech_stack').delete().eq('id', id);
                    fetchTechStack();
                    toast.success('Tech item removed successfully!');
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
            const oldIndex = stack.findIndex((item) => item.id === active.id);
            const newIndex = stack.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(stack, oldIndex, newIndex);

            // Optimistic update
            setStack(newOrder);

            // Update database with new order indices
            const updates = newOrder.map((item, index) => ({
                id: item.id,
                order_index: index
            }));

            for (const update of updates) {
                await supabase.from('tech_stack').update({ order_index: update.order_index }).eq('id', update.id);
            }
        }
    };

    if (loading && stack.length === 0) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Tech Stack...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tech Stack</h2>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                        <Plus size={16} /> Add Tech
                    </button>
                )}
            </div>

            {/* List View */}
            {!isAdding && !editingId && (
                <div className="space-y-2">
                    {stack.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-8">No tech stack items found.</p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={stack.map(e => e.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {stack.map((item) => (
                                        <SortableTechItem
                                            key={item.id}
                                            id={item.id}
                                            item={item}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            )}

            {/* Editor Form View */}
            {(isAdding || editingId) && (
                <div className="border rounded-xl p-6 bg-background">
                    <div className="max-w-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Technology Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-transparent"
                                placeholder="e.g. React"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 mt-6">
                        <button onClick={resetForm} className="px-4 py-2 border rounded-md hover:bg-secondary text-sm font-medium">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                            <Check size={16} /> Save Tech
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
