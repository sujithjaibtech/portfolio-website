import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Trash2, Pencil, Check, GripVertical, FolderOpen } from 'lucide-react';
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

interface SortableProjectItemProps {
    id: string;
    project: any;
    onEdit: (project: any) => void;
    onDelete: (id: string) => void;
}

function SortableProjectItem({ id, project, onEdit, onDelete }: SortableProjectItemProps) {
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
                <div className="w-16 h-12 shrink-0 rounded bg-muted overflow-hidden">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => onEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"><Pencil size={16} /></button>
                <button onClick={() => onDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}

export default function ProjectsEditor() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('order_index', { ascending: true });

        if (!error && data) setProjects(data);
        setLoading(false);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setImageUrl('');
        setLink('');
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (project: any) => {
        setTitle(project.title);
        setDescription(project.description);
        setImageUrl(project.image_url);
        setLink(project.link || '');
        setEditingId(project.id);
        setIsAdding(false);
    };

    const handleSave = async () => {
        if (!title || !description || !imageUrl) return;

        const payload = {
            title,
            description,
            image_url: imageUrl,
            link: link.trim() || undefined
        };

        if (editingId) {
            await supabase.from('projects').update(payload).eq('id', editingId);
        } else {
            const maxOrder = projects.length > 0 ? Math.max(...projects.map(e => e.order_index)) : -1;
            await supabase.from('projects').insert([{ ...payload, order_index: maxOrder + 1 }]);
        }

        resetForm();
        fetchProjects();
        toast.success(editingId ? 'Project updated successfully!' : 'Project added successfully!');
    };

    const handleDelete = (id: string) => {
        toast('Confirm Deletion', {
            description: 'Are you sure you want to delete this project?',
            action: {
                label: 'Delete',
                onClick: async () => {
                    await supabase.from('projects').delete().eq('id', id);
                    fetchProjects();
                    toast.success('Project deleted successfully!');
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
            const oldIndex = projects.findIndex((item) => item.id === active.id);
            const newIndex = projects.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(projects, oldIndex, newIndex);
            setProjects(newOrder);

            const updates = newOrder.map((item, index) => ({
                id: item.id,
                order_index: index
            }));

            for (const update of updates) {
                await supabase.from('projects').update({ order_index: update.order_index }).eq('id', update.id);
            }
        }
    };

    if (loading && projects.length === 0) return <div className="p-6 bg-card rounded-2xl border shadow-sm">Loading Projects...</div>;

    return (
        <div className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-xl font-semibold">
                    <FolderOpen size={24} className="text-primary" />
                    <h2>Projects Carousel</h2>
                </div>
                {!isAdding && !editingId && (
                    <button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
                    >
                        <Plus size={16} /> Add Project
                    </button>
                )}
            </div>

            {/* List View */}
            {!isAdding && !editingId && (
                <div className="space-y-4">
                    {projects.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-8">No projects found.</p>
                    ) : (
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={projects.map(e => e.id)} strategy={verticalListSortingStrategy}>
                                {projects.map((project) => (
                                    <SortableProjectItem key={project.id} id={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
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
                            <label className="block text-sm font-medium mb-1">Project Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="e.g. NextJS Dashboard" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">External Link</label>
                            <input type="text" value={link} onChange={e => setLink(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Short Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="What is this project about?" rows={3}></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button onClick={resetForm} className="px-4 py-2 border rounded-md hover:bg-secondary text-sm font-medium">Cancel</button>
                        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                            <Check size={16} /> Save Project
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
