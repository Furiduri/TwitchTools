export default [{
    path: '/chat/:chanel',
    name: 'Chat',
    component: () => import('../views/Chat.vue'),
    meta:{ }
  },{
    path: '/whothatpokemon/:userID',
    name: 'WhoPokemon.userID',
    component: () => import('../views/WhoThatPokemon.vue'),
    meta:{ }
  },{
    path: '/whothatpokemon/',
    name: 'WhoPokemon',
    component: () => import('../views/WhoThatPokemon.vue'),
    meta:{ }
  },
];