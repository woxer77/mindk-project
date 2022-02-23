import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

import ErrorBoundary from './components/ErrorBoudnary';
import Article from './containers/article/article';
import Profile from './components/profile/profile';
import { DateCont } from './containers/date/date';
import PostsContainer from './containers/posts/posts';
import UsersContainer from './containers/users/users';
import UserContainer from './containers/users/user';
import AddPostContainer from './containers/posts/addPost';
import EditPostContainer from './containers/posts/editPost';
import EditUserContainer from './containers/users/editUser';
import AuthContainer from './containers/auth/auth';
import authContext from './contexts/authContext';

const queryClient = new QueryClient();

function App() {
  const [userData, setUserData] = useState({
    authenticated: true,
    user: {
      userId: 1,
      firstName: 'default name',
      email: 'default@default.com',
    },
    setUserData: () => {},
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <authContext.Provider value={userData}>
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<p>Hello, this is main page</p>} />
                <Route path="*" element={<div>Error 404</div>} />
                <Route path="/date/:date" element={<DateCont />} />
                <Route path="/posts" element={<PostsContainer />} />
                <Route path="/posts/add-post" element={<AddPostContainer />} />
                <Route path="/posts/:id/edit-post" element={<EditPostContainer />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/users/:id" element={<UserContainer />} />
                <Route path="/users/:id/edit-user" element={<EditUserContainer />} />
                <Route path="/auth" element={<AuthContainer />} />

                <Route
                  path="/article/:id"
                  element={(
                    <Article
                      text="React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality."
                      creationDate="07.01.2022"
                    />
                  )}
                />
                <Route
                  path="/profile"
                  element={(
                    <Profile
                      fullName="Ohrimenko Denis Yurievich"
                      birthDate="20.06.2002"
                      placeOfBirth="Ukraine, Sumy"
                      educationPlace="Sumy State University"
                      user={{
                        name: 'test',
                        age: 23,
                        avatar: {
                          file: {
                            id: 1,
                            name: '123.jpg',
                            path: '/files/1.jpg',
                          },
                        },
                        files: [
                          {
                            id: 1,
                            name: '123.jpg',
                            path: '/files/1.jpg',
                          },
                          {
                            id: 1,
                            name: '123.jpg',
                            path: '/files/1.jpg',
                          }],
                        addrr: {
                          main: {
                            line1: 'test',
                            line2: 'test',
                            city: 'test',
                            zip: 1234,
                          },
                          alt: {
                            line1: 'test',
                            line2: 'test',
                            city: 'test',
                            zip: 1234,
                          },
                        },
                        friends: [
                          {
                            name: 'test',
                            age: '23',
                            avatar: {
                              file: {
                                id: 1,
                                name: '123.jpg',
                                path: '/files/1.jpg',
                              },
                            },
                            files: [
                              {
                                id: 1,
                                name: '123.jpg',
                                path: '/files/1.jpg',
                              },
                              {
                                id: 1,
                                name: '123.jpg',
                                path: '/files/1.jpg',
                              }],
                            addrr: {
                              main: {
                                line1: 'test',
                                line2: 'test',
                                city: 'test',
                                zip: 1234,
                              },
                              alt: {
                                line1: 'test',
                                line2: 'test',
                                city: 'test',
                                zip: 1234,
                              },
                            },
                          },
                        ],
                      }}
                    />
                  )}
                />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </authContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
