import { useState } from 'react'

export function TestModal() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Modal
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50">
      <div 
        className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Test Modal</h2>
        <p className="mb-4">Ceci est un modal de test simple.</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Fermer
          </button>
          <button 
            onClick={() => alert('Bouton testé!')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test
          </button>
        </div>
      </div>
    </div>
  )
}