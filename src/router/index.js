import {
  createRouter,
  createWebHistory
} from 'vue-router'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import rutesNavbar from './ViewsAppNavbar'
import rutesClear from './ViewsAppClean'

const routes = [
  {
    path: '/',
    component: () => import('../AppNavbar.vue'),
    children: rutesNavbar
  },  
  {
    path: '/',
    component: () => import('../AppClean.vue'),
    children: rutesClear
  }, 
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
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
      console.log("No tienes permisos para la pagina");
      next("/login");
    }
  }else{
    next();
  }
});

export default router