// import React from 'react'
// import { Box, TextField, Button, Typography } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { fetchCommentData, postBlogComment } from '../API/Functions/Comments.API';
// import { Update } from '@mui/icons-material';
// const PostComment = ({blogId}) => {
//     const dispatch=useDispatch()
//     console.log('comment page',blogId);
//     const userId=localStorage.getItem('userId')
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset
//       } = useForm()
    
//     const onsubmit=async(data)=>{
//         const upData={
//             blog_Id:blogId,
//             user_id:userId,
//             ...data
//         }
//         const response=await dispatch(postBlogComment(upData))
//         reset()
//         await dispatch(fetchCommentData(blogId))
//     }
//   return (
//     <>
//             <Box 
//             component="form" 
//             id="comment-form" 
//             sx={{ my: 5, display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto' }}
//         >
//             <Typography variant="h4" sx={{ mb: 4 }}>Write a comment</Typography>
//             <TextField
//                 label="Comment"
//                 multiline
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 4 ,width:'40rem'}}
//                 {...register('comment')}
//                 id="comment"
//                 placeholder="Comment"
//             />
//             <Button 
//                 variant="contained" 
//                 color="primary" 
//                 type="submit" 
//                 onClick={handleSubmit(onsubmit)}
//                 sx={{ borderRadius: '50px' }}
//             >
//                 Submit Comment
//             </Button>
//         </Box>

//     </>
//   )
// }

// export default PostComment


import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const PostComment = ({  handlePostComment }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    handlePostComment(data);
    reset();
  };

  return (
    <Box 
      component="form" 
      id="comment-form" 
      sx={{ my: 5, display: 'flex', flexDirection: 'column', maxWidth: 600, mx: 'auto' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>Write a comment</Typography>
      <TextField
        label="Comment"
        multiline
        variant="outlined"
        fullWidth
        sx={{ mb: 4, width: '40rem' }}
        {...register('comment', { required: true })}
        id="comment"
        placeholder="Comment"
      />
      {errors.comment && <Typography color="error">Comment is required</Typography>}
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        sx={{ borderRadius: '50px' }}
      >
        Submit Comment
      </Button>
    </Box>
  );
};

export default PostComment;

