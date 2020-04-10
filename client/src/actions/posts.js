import axios from 'axios';

export const submitPost = async newPost => {
  const body = {
    body: newPost,
    userHandle: 'newUser147'
  };

  const config = {
    'Content-Type': 'application/json'
  };

  try {
    //const res = await axios.post('/api/test', body, config);
    const res = await axios.post('/api/firebase/post', body, config);
    console.log(res.message);
  } catch (err) {
    console.log('failed to deliver a post');
  }
};
