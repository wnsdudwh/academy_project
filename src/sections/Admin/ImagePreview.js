const ImagePreview = ({ images, isThumbnail }) => {
  if (!images || images.length === 0) return null

  return (
    <div className={`${isThumbnail ? "" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"}`}>
      {images.map((image, index) => {
        const imageUrl = URL.createObjectURL(image)

        return (
          <div
            key={index}
            className={`
              ${isThumbnail ? "w-full h-40" : "w-full h-24"} 
              relative overflow-hidden rounded-md border border-gray-200
            `}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
              onLoad={() => {
                // 컴포넌트가 언마운트될 때 URL.revokeObjectURL을 호출하여 메모리 누수 방지
                return () => URL.revokeObjectURL(imageUrl)
              }}
            />
            {isThumbnail && (
              <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-br-md">썸네일</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ImagePreview
