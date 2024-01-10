import axios from 'axios';

class FilesService {
  async getUserFiles(userID, authToken) {
    return await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'files/user', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }

  async uploadFile(file, userID, authToken) {
    return await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'files/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID
      }
    });
  }
  
  async downloadFile(fileID, user_priv_base64, authToken) {
    return await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'files/download', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        fileID: fileID,
        user_priv_base64: user_priv_base64,
      },
      responseType: 'blob'
    });
  }

  async deleteFile(userID, fileID, authToken) {
    return await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + 'files', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID,
        fileID: fileID
      }
    });
  }

  async getKey(userID, fileID, authToken) {
    return await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'files/getKey', {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID: userID,
        fileID: fileID
      }
    });
  }

  async getPlatformMetrics() {
    return await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'metrics');
  }

  async getUser(userID, authToken){
    return await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'user',{
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      params:{
        userID
      }
    })
  }

  async updateUser(payload, userID, authToken) {
    return await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}` + "user/edit", payload,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        params:{
          userID: userID
        }
      });
  }
}

export default FilesService = new FilesService();
