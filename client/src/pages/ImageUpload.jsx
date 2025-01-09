import React, { useState } from 'react'; 

function ImageUpload() {   
  const [formData, setFormData] = useState({     
    title: '',     
    description: '',     
    file: null   
  });   

  const [loading, setLoading] = useState(false);   
  const [error, setError] = useState('');   
  const [message, setMessage] = useState('');    

  const handleChange = (e) => {     
    if (e.target.type === 'file') {       
      setFormData({ ...formData, file: e.target.files[0] });     
    } else {       
      setFormData({ ...formData, [e.target.id]: e.target.value });     
    }   
  };    

  const handleSubmit = async (e) => {     
    e.preventDefault();     
    setLoading(true);     
    setError('');      

    const submitFormData = new FormData();     
    submitFormData.append('artwork', formData.file);     
    submitFormData.append('imgTitle', formData.title);     
    submitFormData.append('imgDescription', formData.description);      

    try {       
      const response = await fetch('/api/artwork/uploadart', {         
        method: 'POST',         
        headers: {           
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add this line         
        },         
        body: submitFormData,       
      });        

      const data = await response.json();        

      if (!response.ok) {         
        throw new Error(data.message || 'Upload failed');       
      }       
      setMessage('Image uploaded successfully.'); // Success message

      // Clear form on success       
      setFormData({         
        title: '',         
        description: '',         
        file: null       
      });            

    } catch (error) {       
      setError(error.message || 'Something went wrong. Please try again.');     
    } finally {       
      setLoading(false);     
    }   
  };    

  return (     
    <div className="max-w-md mx-auto mt-10 px-4 sm:mt-20 sm:px-6">       
      <div className="text-center mb-12 sm:mb-16">         
        <h1 className="font-mono text-2xl sm:text-3xl mb-2 sm:mb-3 tracking-tight">Brush Pixels</h1>         
        <h2 className="font-mono text-lg sm:text-xl tracking-tight text-black/80">Upload Artwork</h2>       
      </div>              

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">         
        <input           
          type="text"           
          placeholder="Title"           
          id="title"           
          value={formData.title}           
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light"           
          onChange={handleChange}           
          required         
        />         
        <textarea           
          placeholder="Description"           
          id="description"           
          value={formData.description}           
          className="border-b border-black bg-transparent py-2 sm:py-3 px-1 focus:outline-none focus:border-b-2 transition-all placeholder:text-black/60 placeholder:font-light resize-none"           
          onChange={handleChange}           
          required         
        />         
        <div className="flex flex-col gap-2">           
          <label htmlFor="file" className="font-mono text-sm tracking-tight text-black/80">             
            Select Artwork:           
          </label>           
          <input             
            type="file"             
            id="file"             
            accept="image/*"             
            onChange={handleChange}             
            className="file:mr-4 file:py-2 file:px-4 file:border file:border-black file:text-sm file:font-light file:bg-transparent hover:file:bg-black hover:file:text-white file:transition-colors text-sm text-black/60"             
            required           
          />         
        </div>                  

        <button             
          type="submit"             
          disabled={loading}             
          className={`mt-4 sm:mt-6 border border-black px-6 sm:px-8 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors font-light tracking-wide ${             
            loading ? 'opacity-50 cursor-not-allowed' : ''           
          }`}         
        >           
          {loading ? 'Uploading...' : 'Upload Artwork'}         
        </button>          
      </form>        

      {/* Displaying Success or Error message with styling */}
      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-500 rounded">
          <p className="font-mono text-lg sm:text-xl">{message}</p>
        </div>
      )}

      {error && (         
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-500 rounded">           
          <p className="font-mono text-lg sm:text-xl">{error}</p>         
        </div>       
      )}     
    </div>   
  ); 
}  

export default ImageUpload;
