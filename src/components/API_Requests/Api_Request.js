import axios from 'axios';
const getRequest = async url => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

const postRequest = async (url, data) => {
  // console.log({data: data});
  try {
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

const postFile = async (url, data) => {
  // console.log({ data: data, url: url });
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      redirect: 'follow',
    });
    return await response.json();
  } catch (error) {
    return error.response;
  }
};

export {getRequest, postRequest, postFile};
