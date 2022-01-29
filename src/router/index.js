import {
  createRouter,
  createWebHistory
} from 'vue-router'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/cpanel',
    name: 'CPanel',
    component: () => import('../views/CPanel.vue'),
    meta: {
      auth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = ()=> {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(),
    (user) => {
      removeListener();
      resolve(user);
    },
    reject);

  });
};

router.beforeEach(async(to, from, next) =>{
  if (to.matched.some((item)=> item.meta.auth)) {
    if(await getCurrentUser()){
      next();
    }else{
      console.log("No tienes permisos para la paguina");
      next("/login");
    }
  }else{
    next();
  }
});

export default router