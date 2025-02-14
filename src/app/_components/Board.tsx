"use client"
import DarkLightModeButton from '@/components/dark-light-button';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';


const COLUMN_TEMPLATES = [
    { name: 'To Do', color: 'bg-blue-500' },
    { name: 'In Review', color: 'bg-purple-500' },
    { name: 'Done', color: 'bg-green-500' }
];

const PRESET_COLORS = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
];

interface ColumnData {
    id: string,
    title: string,
    color: string,
    name: string
}

export default function Board() {
    const [columns, setColumns] = useState<ColumnData[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [customName, setCustomName] = useState('');
    const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

    const addColumn = (columnData: { name: string; color: string }) => {
        setColumns([...columns, { ...columnData, id: Date.now().toString(), title: columnData.name }]);
        setShowAddModal(false);
        setCustomName('');
        setSelectedColor(PRESET_COLORS[0]);
    };

    const removeColumn = (columnId: string) => {
        setColumns(columns.filter(col => col.id !== columnId));
    };

    return (
        <div className="min-h-screen  p-6">
            <div className="flex items-center justify-between mb-8 ">
                <h1 className="text-2xl font-bold ">Tender Tasks</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus />
                    Add Column
                </button>
                <DarkLightModeButton/>

            </div>

            {/* Columns Display */}
            <div className="flex gap-6 overflow-x-auto pb-6    ">
                {columns.map(column => (
                    <div key={column.id} className="flex-shrink-0 w-72 h-full ">
                        <div className="bg-gray-800 rounded-lg p-4 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                    <h2 className="font-semibold text-white">{column.name}</h2>
                                </div>
                                <button
                                    onClick={() => removeColumn(column.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            {/* Placeholder for tasks */}
                            <div className="h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                                No tasks yet
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Add Column Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Add New Column</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-gray-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Predefined Templates */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-400 mb-3">Templates</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {COLUMN_TEMPLATES.map(template => (
                                    <button
                                        key={template.name}
                                        onClick={() => addColumn(template)}
                                        className="flex items-center gap-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                                    >
                                        <div className={`w-3 h-3 rounded-full ${template.color}`} />
                                        <span className="text-white">{template.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Column */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-400">Custom Column</h3>
                            <input
                                type="text"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                                placeholder="Enter column name"
                                className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                            />

                            {/* Color Selection */}
                            <div>
                                <label className="text-sm text-gray-400 block mb-2">Select Color</label>
                                <div className="grid grid-cols-8 gap-2">
                                    {PRESET_COLORS.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-6 h-6 rounded-full ${color} ${selectedColor === color ? 'ring-2 ring-white' : ''
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => addColumn({ name: customName, color: selectedColor })}
                                disabled={!customName}
                                className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Custom Column
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}