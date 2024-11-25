import React from 'react';

const PhotoUpload = ({ onUpload }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="relative">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v8m0 0l4-4m-4 4l-4-4m8 8H4"
              />
            </svg>
          </div>
        </div>
      </label>
      <p className="mt-2 text-center text-gray-600">
        Click the circle to upload your profile picture.
      </p>
    </div>
  );
};

export default PhotoUpload;