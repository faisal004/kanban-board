"use client"

import { useState } from 'react';
import { useColumnStore } from '@/store/columnStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const PRESET_COLORS = [
  { name: 'Slate', value: '#475569' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Pink', value: '#db2777' },
];

const AddColumns = () => {
  const addColumn = useColumnStore(state => state.addColumn);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    color: PRESET_COLORS[0].value
  });
  const [errors, setErrors] = useState({
    title: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = { title: '' };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Column title is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddColumn = () => {
    if (!validateForm()) return;

    addColumn(formData.title, formData.color);
    setFormData({
      title: '',
      color: PRESET_COLORS[0].value
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className=""
        >
          + Add Column
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Column Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter column title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Column Color</Label>
            <div className="grid grid-cols-8 gap-2">
              {PRESET_COLORS.map((color) => (
                <Button
                  key={color.value}
                  type="button"
                  variant="outline"
                  className={`h-12 w-full rounded-full p-0 overflow-hidden ${
                    formData.color === color.value ? 'ring-2 ring-offset-2 ring-white' : ''
                  }`}
                  onClick={() => handleInputChange('color', color.value)}
                >
                  <div
                    className="h-full w-full"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddColumn}>
            Add Column
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddColumns;