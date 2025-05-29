import './Accomodation.css';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCloudinaryUrl } from '../../Claudinary/claudinaryupload';

const apiUrl = import.meta.env.VITE_travel;

interface Accommodation {
  id: string;
  name: string;
  description: string;
  city: string;
  county: string;
  country: string;
  circuit: string;
  class: number;
  imgUrl: string;
  publicId: string;
  serviceLevel: {
    id: string;
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  rooms: {
    roomType: {
      id: string;
      name: string;
      capacity: number;
    };
  }[];
  amenities: {
    amenity: {
      id: string;
      name: string;
    };
  }[];
}

interface AccommodationType {
  id: string;
  name: string;
}

interface ServiceLevel {
  id: string;
  name: string;
}

interface RoomType {
  id: string;
  name: string;
  capacity: number;
}

interface Amenity {
  id: string;
  name: string;
}

function Accomodation() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    county: '',
    country: '',
    circuit: '',
    class: 3,
    serviceLevelId: '',
    typeId: '',
    imgUrl: '',
    publicId: '',
    roomTypeIds: [] as string[],
    amenityIds: [] as string[],
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [modalContent, setModalContent] = useState<{title: string, items: string[]}>({title: '', items: []});
  const [expandedSections, setExpandedSections] = useState({
    accommodationType: false,
    serviceLevel: false,
    roomTypes: false,
    amenities: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const {
    data: accommodations,
    isLoading: isLoadingAccommodations,
    error: accommodationsError,
    refetch: refetchAccommodations,
  } = useQuery<Accommodation[]>({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/accommodation/fetch-all-accommodations`);
      if (!res.ok) throw new Error('Failed to fetch accommodations');
      return res.json();
    },
  });

  const {
    data: accommodationTypes,
    isLoading: isLoadingAccommodationTypes
  } = useQuery<AccommodationType[]>({
    queryKey: ['accommodationTypes'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/accommodation-type/fetch-all`);
      if (!res.ok) throw new Error('Failed to fetch accommodation types');
      return res.json();
    },
  });

  const {
    data: serviceLevels,
    isLoading: isLoadingServiceLevels
  } = useQuery<ServiceLevel[]>({
    queryKey: ['serviceLevels'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/service-level/fetch-all-service-levels`);
      if (!res.ok) throw new Error('Failed to fetch service levels');
      return res.json();
    },
  });

  const {
    data: roomTypes,
    isLoading: isLoadingRoomTypes
  } = useQuery<RoomType[]>({
    queryKey: ['roomTypes'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/room-type/fetch-all`);
      if (!res.ok) throw new Error('Failed to fetch room types');
      return res.json();
    },
  });

  const {
    data: amenities,
    isLoading: isLoadingAmenities
  } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/amenity/fetch-all-amenities`);
      if (!res.ok) throw new Error('Failed to fetch amenities');
      return res.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newAccommodation: typeof formData) => {
      let imgUrl = newAccommodation.imgUrl;
      let publicId = newAccommodation.publicId;
      
      if (selectedFile) {
        setIsUploading(true);
        try {
          const { url, publicId: cloudinaryPublicId } = await getCloudinaryUrl(selectedFile);
          if (!url || !cloudinaryPublicId) {
            throw new Error('Failed to upload image to Cloudinary');
          }
          imgUrl = url;
          publicId = cloudinaryPublicId;
        } finally {
          setIsUploading(false);
        }
      }

      // Transform the data to match backend expectations
      const submissionData = {
        name: newAccommodation.name,
        description: newAccommodation.description,
        city: newAccommodation.city,
        county: newAccommodation.county,
        country: newAccommodation.country,
        circuit: newAccommodation.circuit,
        class: newAccommodation.class,
        serviceLevelId: newAccommodation.serviceLevelId,
        typeId: newAccommodation.typeId,
        imgUrl,
        publicId,
        rooms: newAccommodation.roomTypeIds.map(id => ({ roomTypeId: id })),
        amenities: newAccommodation.amenityIds.map(id => ({ amenityId: id }))
      };

      const res = await fetch(`${apiUrl}/accommodation/add-accommodation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (!res.ok) throw new Error('Failed to add accommodation');
      return res.json();
    },
    onSuccess: () => {
      toast.success('Accommodation added!');
      setFormData({
        name: '',
        description: '',
        city: '',
        county: '',
        country: '',
        circuit: '',
        class: 3,
        serviceLevelId: '',
        typeId: '',
        imgUrl: '',
        publicId: '',
        roomTypeIds: [],
        amenityIds: [],
      });
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      refetchAccommodations();
    },
    onError: (error: Error) => toast.error(`Error adding accommodation: ${error.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${apiUrl}/accommodation/delete-accommodation-by-id?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete accommodation');
      return res.json();
    },
    onMutate: (id: string) => setDeletingId(id),
    onSuccess: () => {
      toast.success('Accommodation deleted!');
      refetchAccommodations();
    },
    onError: (error: Error) => toast.error(`Error deleting accommodation: ${error.message}`),
    onSettled: () => setDeletingId(null),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.typeId || !formData.serviceLevelId) {
      toast.error('Name, type, and service level are required');
      return;
    }
    addMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'class' ? parseInt(value) : value,
    }));
  };

  const handleCheckboxChange = (type: 'serviceLevelId' | 'typeId' | 'roomTypeIds' | 'amenityIds', id: string) => {
    setFormData(prev => {
      if (type === 'serviceLevelId' || type === 'typeId') {
        return {
          ...prev,
          [type]: prev[type] === id ? '' : id,
        };
      } else {
        const current = prev[type];
        const newValue = current.includes(id)
          ? current.filter(item => item !== id)
          : [...current, id];
        return {
          ...prev,
          [type]: newValue,
        };
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData(prev => ({
          ...prev,
          imgUrl: event.target!.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const showSelectedValues = (type: 'serviceLevel' | 'accommodationType' | 'roomTypes' | 'amenities') => {
    let title = '';
    let items: string[] = [];

    switch (type) {
      case 'serviceLevel':
        title = 'Selected Service Levels';
        items = formData.serviceLevelId
          ? [serviceLevels?.find(sl => sl.id === formData.serviceLevelId)?.name || formData.serviceLevelId]
          : [];
        break;
      case 'accommodationType':
        title = 'Selected Accommodation Types';
        items = formData.typeId
          ? [accommodationTypes?.find(at => at.id === formData.typeId)?.name || formData.typeId]
          : [];
        break;
      case 'roomTypes':
        title = 'Selected Room Types';
        items = formData.roomTypeIds.map(rtId => 
          roomTypes?.find(rt => rt.id === rtId)?.name || rtId
        );
        break;
      case 'amenities':
        title = 'Selected Amenities';
        items = formData.amenityIds.map(amId => 
          amenities?.find(am => am.id === amId)?.name || amId
        );
        break;
    }

    setModalContent({ title, items });
    setShowSelectionModal(true);
  };

  return (
    <div className='accomodation-container'>
      <Toaster richColors position='top-center' />

      {showSelectionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalContent.title}</h3>
            {modalContent.items.length > 0 ? (
              <ul>
                {modalContent.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No items selected</p>
            )}
            <button 
              className="btn btn-primary mt-3"
              onClick={() => setShowSelectionModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className='accomodation-header'>
        <h1>Accommodation Management</h1>
        <p>Create, view, update, and delete accommodations</p>
      </div>

      <div className='accomodation-content'>
        <div className='accomodation-form'>
          <h2>Add New Accommodation</h2>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='name'>Name*</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className='form-group'>
                  <div className="d-flex justify-content-between align-items-center">
                    <label>Accommodation Type*</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => toggleSection('accommodationType')}
                    >
                      {expandedSections.accommodationType ? 'Hide Options' : 'Show Options'}
                    </button>
                  </div>
                  {expandedSections.accommodationType && (
                    <div className='checkbox-group mt-2'>
                      {isLoadingAccommodationTypes ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        accommodationTypes?.map(type => (
                          <div key={type.id} className='checkbox-item'>
                            <input
                              type='checkbox'
                              id={`type-${type.id}`}
                              checked={formData.typeId === type.id}
                              onChange={() => handleCheckboxChange('typeId', type.id)}
                            />
                            <label htmlFor={`type-${type.id}`}>{type.name}</label>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => showSelectedValues('accommodationType')}
                    disabled={isLoadingAccommodationTypes}
                  >
                    Show Selected Types
                  </button>
                </div>

                <div className='form-group'>
                  <div className="d-flex justify-content-between align-items-center">
                    <label>Service Level*</label>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => toggleSection('serviceLevel')}
                    >
                      {expandedSections.serviceLevel ? 'Hide Options' : 'Show Options'}
                    </button>
                  </div>
                  {expandedSections.serviceLevel && (
                    <div className='checkbox-group mt-2'>
                      {isLoadingServiceLevels ? (
                        <div className="text-center">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        serviceLevels?.map(level => (
                          <div key={level.id} className='checkbox-item'>
                            <input
                              type='checkbox'
                              id={`service-${level.id}`}
                              checked={formData.serviceLevelId === level.id}
                              onChange={() => handleCheckboxChange('serviceLevelId', level.id)}
                            />
                            <label htmlFor={`service-${level.id}`}>{level.name}</label>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => showSelectedValues('serviceLevel')}
                    disabled={isLoadingServiceLevels}
                  >
                    Show Selected Service Levels
                  </button>
                </div>

                <div className='form-group'>
                  <label htmlFor='class'>Class (Stars)</label>
                  <select
                    id='class'
                    name='class'
                    value={formData.class}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    id='city'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='county'>County/State</label>
                  <input
                    type='text'
                    id='county'
                    name='county'
                    value={formData.county}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='country'>Country</label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='circuit'>Circuit/Region</label>
                  <input
                    type='text'
                    id='circuit'
                    name='circuit'
                    value={formData.circuit}
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group'>
                  <label>Accommodation Image</label>
                  <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  {isUploading && <p>Uploading image...</p>}
                  {formData.imgUrl && (
                    <div className='image-preview'>
                      <img src={formData.imgUrl} alt='Preview' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='form-group'>
              <div className="d-flex justify-content-between align-items-center">
                <label>Room Types</label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleSection('roomTypes')}
                >
                  {expandedSections.roomTypes ? 'Hide Options' : 'Show Options'}
                </button>
              </div>
              {expandedSections.roomTypes && (
                <div className='checkbox-group mt-2'>
                  {isLoadingRoomTypes ? (
                    <div className="text-center">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    roomTypes?.map(roomType => (
                      <div key={roomType.id} className='checkbox-item'>
                        <input
                          type='checkbox'
                          id={`room-${roomType.id}`}
                          checked={formData.roomTypeIds.includes(roomType.id)}
                          onChange={() => handleCheckboxChange('roomTypeIds', roomType.id)}
                        />
                        <label htmlFor={`room-${roomType.id}`}>
                          {roomType.name} (Capacity: {roomType.capacity})
                        </label>
                      </div>
                    ))
                  )}
                </div>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => showSelectedValues('roomTypes')}
                disabled={isLoadingRoomTypes}
              >
                Show Selected Room Types
              </button>
            </div>

            <div className='form-group'>
              <div className="d-flex justify-content-between align-items-center">
                <label>Amenities</label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => toggleSection('amenities')}
                >
                  {expandedSections.amenities ? 'Hide Options' : 'Show Options'}
                </button>
              </div>
              {expandedSections.amenities && (
                <div className='checkbox-group mt-2'>
                  {isLoadingAmenities ? (
                    <div className="text-center">
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    amenities?.map(amenity => (
                      <div key={amenity.id} className='checkbox-item'>
                        <input
                          type='checkbox'
                          id={`amenity-${amenity.id}`}
                          checked={formData.amenityIds.includes(amenity.id)}
                          onChange={() => handleCheckboxChange('amenityIds', amenity.id)}
                        />
                        <label htmlFor={`amenity-${amenity.id}`}>{amenity.name}</label>
                      </div>
                    ))
                  )}
                </div>
              )}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary mt-2"
                onClick={() => showSelectedValues('amenities')}
                disabled={isLoadingAmenities}
              >
                Show Selected Amenities
              </button>
            </div>

            <button 
              type='submit' 
              className='submit-btn' 
              disabled={addMutation.isPending || isUploading}
            >
              {addMutation.isPending ? 'Saving...' : 'Save Accommodation'}
            </button>
          </form>
        </div>

        <div className='accomodation-table'>
          <h2>Existing Accommodations</h2>
          {isLoadingAccommodations ? (
            <div className='text-center my-4'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading accommodations...</span>
              </div>
            </div>
          ) : accommodationsError ? (
            <div className='error-message'>Error fetching accommodations</div>
          ) : (
            <div className='table-responsive'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Service Level</th>
                    <th>Class</th>
                    <th>Location</th>
                    <th>Rooms</th>
                    <th>Amenities</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accommodations?.map(accommodation => (
                    <tr key={accommodation.id}>
                      <td>{accommodation.name}</td>
                      <td>{accommodation.type?.name || 'N/A'}</td>
                      <td>{accommodation.serviceLevel?.name || 'N/A'}</td>
                      <td>{accommodation.class} Star</td>
                      <td>
                        {[accommodation.city, accommodation.county, accommodation.country]
                          .filter(Boolean).join(', ')}
                      </td>
                      <td>
                        {accommodation.rooms?.map(r => r.roomType.name).join(', ') || 'None'}
                      </td>
                      <td>
                        {accommodation.amenities?.map(a => a.amenity.name).join(', ') || 'None'}
                      </td>
                      <td>
                        {accommodation.imgUrl && (
                          <img 
                            src={accommodation.imgUrl} 
                            alt={accommodation.name} 
                            style={{ maxWidth: '50px', maxHeight: '50px' }}
                          />
                        )}
                      </td>
                      <td>
                        {deletingId === accommodation.id ? (
                          <div className='spinner-border spinner-border-sm text-danger' role='status'>
                            <span className='visually-hidden'>Deleting...</span>
                          </div>
                        ) : (
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteMutation.mutate(accommodation.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accomodation;