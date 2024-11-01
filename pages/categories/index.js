import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put('/api/categories', { name, parentCategory, _id: editingCategoryId });
        toast.success('Category updated successfully!');
      } else {
        await axios.post('/api/categories', { name, parentCategory });
        toast.success('Category added successfully!');
      }
      setName('');
      setParentCategory('');
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setName(category.name);
    setParentCategory(category.parent?._id || '');
    setEditingCategoryId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories?_id=${id}`);
      toast.success('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border rounded mr-2"
          required
        />
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="px-3 py-2 border rounded mr-2"
        >
          <option value="">Select Parent Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200 bg-white text-md border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Parent Category</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-t">
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">{category.parent?.name || 'N/A'}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="px-2 py-1 mr-2 bg-green-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
