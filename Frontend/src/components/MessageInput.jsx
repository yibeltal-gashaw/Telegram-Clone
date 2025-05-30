import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'
import {Plus, X} from 'lucide-react'

function MessageInput() {
      const { sendMessages } = useChatStore();
      const [text, setText] = useState("");
      const [imagePreview, setImagePreview] = useState(null);
      const [file, setFile] = useState(null);
      const fileInputRef = useRef(null);

      const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile?.type.startsWith('image/')) {
          toast.error("Please select an image file");
          return;
        }

        // Save file for upload
        setFile(selectedFile);

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      };

      const removeImage = () => {
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = ""
      }

      const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        try {
          await sendMessages({
            text: text.trim(),
            image: file, // send actual file
          });

          // Clear form
          setText("");
          setImagePreview(null);
          setFile(null);
          if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (error) {
          toast.error("Failed to send message");
        }
      };

  return (
    <div>
        <div className="flex items-center justify-center gap-2 bg-base-200 px-4 py-2">
        {
          imagePreview && (
            <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="size-20 object-cover rounded-lg"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full shadow"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
          )
        }

        <input
            type='file'
            accept='images/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type='button'
            aria-label='Upload Images'
            className={`hidden sm:flex btn btn-circle hover:text-emerald-500 ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={20} />
          </button>

          <textarea
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e)=>{setText(e.target.value)}}
            className="flex-1 bg-transparent max-h-32 outline-none text-base-content resize-none overflow-y-scroll"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          
          
          <button
            className="btn btn-circle btn-sm btn-primary"
            onClick={handleSendMessage}
            aria-level='Send Message'
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
  )
}

export default MessageInput
