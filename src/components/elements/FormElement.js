'use client';

export default function FormElement({ fields, styles, onSubmit }) {
  const defaultFields = fields || [
    { type: 'text', label: 'Name', placeholder: 'Enter your name' },
    { type: 'email', label: 'Email', placeholder: 'Enter your email' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    if (onSubmit) onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} style={styles} className="space-y-4">
      {defaultFields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.label.toLowerCase()}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          ) : (
            <input
              type={field.type}
              name={field.label.toLowerCase()}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}