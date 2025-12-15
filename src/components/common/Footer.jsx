export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} StallOrder. All rights reserved.
      </div>
    </footer>
  );
}
