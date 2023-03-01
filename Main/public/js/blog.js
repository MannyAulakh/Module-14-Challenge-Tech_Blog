
// ------------Post Comment Function------------
const postcomment = async (event) => {
    event.preventDefault();
  
    const comment_descr = await document.querySelector('#Comment').value.trim();
    const post_id  = await document.querySelector('#blogID').innerHTML;
  
  
    if (comment_descr) {
      const response = await fetch("/api/Blogposts", {
        method: 'POST',
        body: JSON.stringify({ comment_descr, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/Blogpost/${post_id}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

  // ------------Edit Blog Function------------
  const editblog = async (event) => {
    event.preventDefault();
  
    const title = await document.querySelector('#NEWblog-name').value.trim();
    const description  = await document.querySelector('#NEWblog-desc').value.trim();
    const post_id  = await document.querySelector('#blogID').innerHTML;
  
  
    if (title && description) {
      const response = await fetch(`/api/Blogposts`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/Blogpost/${post_id}`);
      } else {
        alert('Failed to edit');
      }
    }
  };
  
//------------listners------------
  document
    .querySelector('#comment-button')
    .addEventListener('click', postcomment);

  document
    .querySelector('#Edit')
    .addEventListener('click', editblog);