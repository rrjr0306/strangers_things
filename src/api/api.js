export const BASEURL =
  "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log(`Bearer ${token}`)
  }
  return headers;
};

const callAPI = async (endpointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;
  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASEURL}${endpointPath}`, options);
  const result = await response.json();

  return result;
};

// *** callAPI WITH error handling
// try {
//     const response = await fetch(`${BASEURL}${endpointPath}`, options);
//     const result = await response.json();

//     if (success) {
//         let result = {
//             error: null,
//             data: data
//         };

//     } else {
//         return {
//             error: error.message,
//             data: null
//         };
//     }
// } catch (error) {
//     console.error(`Failed while calling ${endpointPath}:`, error )

//     return {
//         error: defaultOptions.defaultError,
//         data: null
//     };

export const fetchPosts = async (token) => {
  //      ** callAPI WITH error handling build in **
  //     const { error, data} = await callAPI('/posts', {
  //         defaultError: 'Failed to load posts.'
  //     });
  //     return {
  //         error,
  //         vacations: data ? data.posts : []
  //     };

  try {
    const { success, error, data } = await callAPI("/posts", {
      token: token,
    });
    if (success) {
      return {
        error: null,
        posts: data.posts,
      };
    } else {
      return {
        error: error.message,
        posts: [],
      };
    }

    // const response = await fetch(`${BASEURL}/posts`);
    // console.log("-----RESPONSE------", response);
    // const { data } = await response.json();
    // console.log("THIS IS DATA", data.posts);
    // return data.posts;
  } catch (error) {
    console.error("There was an error fetching posts.", error);

    return {
      error: "Failed to load posts.",
      posts: [],
    };
  }
};

export const registerUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }

    //     const response = await fetch(`${BASEURL}/users/register`, {
    //         method: "POST",
    //         headers: makeHeaders(),
    //         body: JSON.stringify({
    //         user: {
    //             username,
    //             password,
    //         }
    //         })
    // })
    // console.log("RESPONSE---------->", response)
    // const data = await response.json();
    // console.log("----------data---------", data)
    // return data;
  } catch (error) {
    console.error("There was an error registering the user", error);

    return {
      error: "Registration Failed",
      token: null,
      message: null,
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }

    //     const response = await fetch(`${BASEURL}/users/register`, {
    //         method: "POST",
    //         headers: makeHeaders(),
    //         body: JSON.stringify({
    //         user: {
    //             username,
    //             password,
    //         }
    //         })
    // })
    // console.log("RESPONSE---------->", response)
    // const data = await response.json();
    // console.log("----------data---------", data)
    // return data;
  } catch (error) {
    console.error("There was an error logging in the user", error);

    return {
      error: "Log in Failed",
      token: null,
      message: null,
    };
  }
};

export const fetchGuest = async (token) => {
  try {
    const { success, error, data } = await callAPI("/users/me", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        username: data.username,
      };
    } else {
      return {
        error: error.message,
        username: null,
      };
    }

    // const response = await fetch(`${BASEURL}/users/me`, {
    //     headers: makeHeaders(token),
    // });
    // console.log("USER RESP BODY---------->", response)
    // const { data } = await response.json()
    // console.log("USER DATA-------->", data)
    // return data;
  } catch (error) {
    console.error("Failed to fetch guest", error);
    return {
      error: "Failed to load user information",
      username: null,
    };
  }
};

export const createPost = async (
  token,
  title,
  description,
  price,
  willDeliver
) => {
  try {
    const post = {
      title,
      description,
      price,
      willDeliver,
    };

    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: post,
      },
    });

    if (success) {
      return {
        error: null,
        post: data.post,
      };
    } else {
      return {
        error: error.message,
        post: null,
      };
    }
  } catch (error) {
    console.error("POST /posts failed:", error);

    return {
      error: "Something went horribly wrong, failed to create the post",
      post: null,
    };
  }
};

export const deletePost = async (token, postId) => {
  try {
    const { success, error } = await callAPI(`posts/${postId}`, {
      method: "DELETE",
      token: token,
    });
    if (success) {
      return {
        error: null,
        data: null,
      };
    } else {
      return {
        error: error.mesage,
        data: null,
      };
    }
  } catch (error) {
    console.error("DELETE /posts/postId failed", error);
    return {
      error: "Could not delete post",
      data: null,
    };
  }
};

export const addMessage = async (token, postId, messageText) => {
  try {
    const { success, error, data } = await callAPI(
      `/posts/${postId}/messages`,
      {
        token: token,
        method: "POST",
        body: {
          message: {
            content: messageText,
          },
        },
      }
    );

    if (success) {
      return {
        success: success,
        error: null,
        data: {
            message: messageText,
        }    
      };
    } else {
      return {
        success: success,
        error: error.message,
        data: {
            message: null
        }    
      };
    }
  } catch (error) {
    console.error(`POST /posts/${postId}/messages failed:`, error);

    return {
      success: false,
      error: "Failed to send message",
      data: {
        message: null
      }   
    };
  }
};


