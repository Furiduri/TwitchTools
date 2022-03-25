import axios from 'axios'
const Call = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 1000
  });
const _Params = {
    Items: 0
}
const PokeApi = {
    GetPokemon: async ()=>{
        if(_Params.Items <= 0){
            let res = await Call.get("/pokemon");
            if(res.status === 200){
                _Params.Items = res.data.count
            }
        }
        let numberPoke = Math.floor(Math.random() * _Params.Items-1) + 0;
        let searchPoke = await Call.get(`/pokemon?offset=${numberPoke}&limit=1`);
        let PokeName = searchPoke.data.results[0].name;
        let Pokemon = await (await Call.get(`/pokemon/${PokeName}`)).data;
        
        return {
            name: Pokemon.name.replace(/^\w/, c => c.toUpperCase()),
            image: Pokemon.sprites.other["official-artwork"].front_default == null ?
                     Pokemon.sprites.front_default == null ? Pokemon.sprites.other.home.front_default : Pokemon.sprites.front_default
                     : Pokemon.sprites.other["official-artwork"].front_default,
            types: await PokeApi.GetBageType(Pokemon.types)
        };
    },
    GetBageType: async(types)=>{
        let BageTypes = new Array();
        for (let index = 0; index < types.length; index++) {
            const element = types[index];            
            let res = await (await Call.get(`/type/${element.type.name}`)).data;            
            BageTypes.push(res.names[5].name);
        }
        return BageTypes;
    }
}

export default PokeApi;