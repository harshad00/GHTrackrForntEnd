export default function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
