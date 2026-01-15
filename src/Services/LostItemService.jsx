import axios from 'axios';

const LOST_URL = 'http://localhost:9595/lostfound/lost';
const ID_URL = 'http://localhost:9595/lostfound/lost-id';
const USR_URL = 'http://localhost:9595/lostfound/lost-user';
const UPLOAD_URL = 'http://localhost:9595/lostfound/upload-image';

export const saveLostItem = (lostItem) => {
    return axios.post(LOST_URL, lostItem, {
        withCredentials: true
    });
};

export const getAllLostItems = () => {
    return axios.get(LOST_URL, {
        withCredentials: true
    });
};

export const getLostItemById = (id) => {
    return axios.get(`${LOST_URL}/${id}`, {
        withCredentials: true
    });
};

export const deleteLostItemById = (id) => {
    return axios.delete(`${LOST_URL}/${id}`, {
        withCredentials: true
    });
};

export const updateLostItem = (lostItem) => {
    return axios.put(LOST_URL, lostItem, {
        withCredentials: true
    });
};

export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
};

export const getLostItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
};

// New function for image upload
export const uploadImage = (formData) => {
    return axios.post(UPLOAD_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
};
