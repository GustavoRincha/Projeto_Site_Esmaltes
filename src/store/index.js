import { createStore } from 'vuex';

const STORAGE_KEY = 'nail-polish-catalog';

const basePolishes = [
  { id: 'base-1', name: 'Gabriela', brand: 'Risqué', color: '', image: '/Imagens/Gabriela - Risqué.png' },
  { id: 'base-2', name: 'Jabuticaba', brand: 'Colorama', color: '', image: '/Imagens/Jabuticaba - Colorama.png' },
  { id: 'base-3', name: 'Jackie', brand: 'Impala', color: '', image: '/Imagens/Jackie - Impala.png' },
  { id: 'base-4', name: 'Léo mandou flores', brand: 'Risqué', color: '', image: '/Imagens/Léo mandou flores - Risqué.png' },
  { id: 'base-5', name: 'Malbec', brand: 'Anita', color: '', image: '/Imagens/Malbec - Anita.png' },
  { id: 'base-6', name: 'Plutão', brand: 'colortrend', color: '', image: '/Imagens/Plutão - colortrend.png' },
  { id: 'base-7', name: 'a mil por hora metal like', brand: 'Impala', color: '', image: '/Imagens/a mil por hora metal like - Impala.png' },
  { id: 'base-8', name: 'azulivre mente', brand: 'Risqué', color: '', image: '/Imagens/azulivre mente - Risqué.png' },
  { id: 'base-9', name: 'beijo', brand: 'Risqué', color: '', image: '/Imagens/beijo - Risqué.png' },
  { id: 'base-10', name: 'beterraba', brand: 'Impala', color: '', image: '/Imagens/beterraba - Impala.png' },
  { id: 'base-11', name: 'bianco puríssimo', brand: 'Risqué', color: '', image: '/Imagens/bianco puríssimo - Risqué.png' },
  { id: 'base-12', name: 'café café', brand: 'Impala', color: '', image: '/Imagens/café café - Impala.png' },
  { id: 'base-13', name: 'camafeu', brand: 'Anita', color: '', image: '/Imagens/camafeu - Anita.png' },
  { id: 'base-14', name: 'cancela julgamentos', brand: 'Risqué', color: '', image: '/Imagens/cancela julgamentos - Risqué.png' },
  { id: 'base-15', name: 'carmim', brand: 'Risqué', color: '', image: '/Imagens/carmim - Risqué.png' },
  { id: 'base-16', name: 'cereja', brand: 'Colorama', color: '', image: '/Imagens/cereja - Colorama.png' },
  { id: 'base-17', name: 'confiante e imprevisível metal like', brand: 'Impala', color: '', image: '/Imagens/confiante e imprevisível metal like - Impala.png' },
  { id: 'base-18', name: 'confiança', brand: 'brilho ativo', color: '', image: '/Imagens/confiança - brilho ativo.png' },
  { id: 'base-19', name: 'descomplicado', brand: 'Impala', color: '', image: '/Imagens/descomplicado - Impala.png' },
  { id: 'base-20', name: 'dizeres', brand: 'Impala', color: '', image: '/Imagens/dizeres - Impala.png' },
  { id: 'base-21', name: 'doce pérola', brand: 'Risqué', color: '', image: '/Imagens/doce pérola - Risqué.png' },
  { id: 'base-22', name: 'encanto', brand: 'brilho ativo', color: '', image: '/Imagens/encanto - brilho ativo.png' },
  { id: 'base-23', name: 'estrela do rodeio', brand: 'Impala', color: '', image: '/Imagens/estrela do rodeio - Impala.png' },
  { id: 'base-24', name: 'fashion prata', brand: 'bellia', color: '', image: '/Imagens/fashion prata – bellia.png' },
  { id: 'base-25', name: 'gold vibes', brand: 'Risqué', color: '', image: '/Imagens/gold vibes - Risqué.png' },
  { id: 'base-26', name: 'granulado rosé', brand: 'Risqué', color: '', image: '/Imagens/granulado rosé - Risqué.png' },
  { id: 'base-27', name: 'hortelã', brand: 'colortrend (Avon)', color: '', image: '/Imagens/hortelã - colortrend (Avon).png' },
  { id: 'base-28', name: 'infinito', brand: 'Impala', color: '', image: '/Imagens/infinito - Impala.png' },
  { id: 'base-29', name: 'irreverente, sincero', brand: 'Impala (Netflix)', color: '', image: '/Imagens/irreverente, sincero - Impala (Netflix).png' },
  { id: 'base-30', name: 'labrador chocolate', brand: 'Studio 35', color: '', image: '/Imagens/labrador chocolate - Studio 35.jpg' },
  { id: 'base-31', name: 'lavanda alma', brand: 'Risqué', color: '', image: '/Imagens/lavanda alma - Risqué.png' },
  { id: 'base-32', name: 'maçã do amor', brand: 'Risqué', color: '', image: '/Imagens/maçã do amor - Risqué.png' },
  { id: 'base-33', name: 'metal red', brand: 'cora Black 12', color: '', image: '/Imagens/metal red - cora Black 12.png' },
  { id: 'base-34', name: 'mini saia', brand: 'Risqué', color: '', image: '/Imagens/mini saia - Risqué.png' },
  { id: 'base-35', name: 'na mira 3d', brand: 'Impala', color: '', image: '/Imagens/na mira 3d - Impala.png' },
  { id: 'base-36', name: 'nego drama', brand: 'brilho ativo', color: '', image: '/Imagens/nego drama - brilho ativo.png' },
  { id: 'base-37', name: 'netuno', brand: 'colortrend (Avon)', color: '', image: '/Imagens/netuno - colortrend (Avon).png' },
  { id: 'base-38', name: 'novo azul', brand: 'Risqué', color: '', image: '/Imagens/novo azul - Risqué.png' },
  { id: 'base-39', name: 'o táxi da Phoebe', brand: 'Risqué', color: '', image: '/Imagens/o táxi da Phoebe - Risqué.png' },
  { id: 'base-40', name: 'obsessão', brand: 'Risqué', color: '', image: '/Imagens/obsessão - Risqué.png' },
  { id: 'base-41', name: 'poder de muitas', brand: 'Risqué', color: '', image: '/Imagens/poder de muitas - Risqué.png' },
  { id: 'base-42', name: 'polar', brand: 'Impala', color: '', image: '/Imagens/polar - Impala.png' },
  { id: 'base-43', name: 'preto', brand: 'Impala', color: '', image: '/Imagens/preto - Impala.png' },
  { id: 'base-44', name: 'pérola', brand: 'Risqué', color: '', image: '/Imagens/pérola - Risqué.png' },
  { id: 'base-45', name: 'rainha da pista toda', brand: 'Risqué', color: '', image: '/Imagens/rainha da pista toda - Risqué.png' },
  { id: 'base-46', name: 'rebu', brand: 'Risqué', color: '', image: '/Imagens/rebu - Risqué.png' },
  { id: 'base-47', name: 'recuar', brand: 'brilho ativo', color: '', image: '/Imagens/recuar - brilho ativo.png' },
  { id: 'base-48', name: 'selfie na floresta', brand: 'Impala', color: '', image: '/Imagens/selfie na floresta - Impala.png' },
  { id: 'base-49', name: 'sem limites metal like', brand: 'Impala', color: '', image: '/Imagens/sem limites metal like - Impala.png' },
  { id: 'base-50', name: 'sinistro, empolgante', brand: 'Impala', color: '', image: '/Imagens/sinistro, empolgante - Impala.png' },
  { id: 'base-51', name: 'terracota que provoca', brand: 'Risqué', color: '', image: '/Imagens/terracota que provoca - Risqué.png' },
  { id: 'base-52', name: 'vanguarda', brand: 'Risqué', color: '', image: '/Imagens/vanguarda - Risqué.png' },
  { id: 'base-53', name: 'verde safira', brand: 'colortrend (Avon)', color: '', image: '/Imagens/verde safira - colortrend (Avon).png' },
  { id: 'base-54', name: 'é mais que um golpe', brand: 'Impala', color: '', image: '/Imagens/é mais que um golpe - Impala.png' },
];

export default createStore({
  state: {
    nailPolishes: [],
    customPolishes: []
  },
  mutations: {
    SET_CUSTOM_POLISHES(state, polishes) {
      state.customPolishes = polishes;
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
    },
    ADD_POLISH(state, polish) {
      state.customPolishes.push(polish);
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customPolishes));
    },
    REMOVE_POLISH(state, id) {
      // Allow removing custom ones only
      state.customPolishes = state.customPolishes.filter(p => p.id !== id);
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.customPolishes));
    }
  },
  actions: {
    loadFromStorage({ commit }) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          commit('SET_CUSTOM_POLISHES', parsed);
        } catch (e) {
          console.error("Erro ao ler do LocalStorage", e);
          commit('SET_CUSTOM_POLISHES', []);
        }
      } else {
        commit('SET_CUSTOM_POLISHES', []);
      }
    },
    
    // Converte arquivo para base64 e salva
    async addNailPolish({ commit }, { name, brand, color, imageFile }) {
      return new Promise((resolve, reject) => {
        if (!imageFile) {
          commit('ADD_POLISH', {
             id: Date.now().toString(),
             name,
             brand,
             color,
             image: null
          });
          resolve();
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          commit('ADD_POLISH', {
             id: Date.now().toString(),
             name,
             brand,
             color,
             image: reader.result // Base64
          });
          resolve();
        };
        reader.onerror = (error) => reject(error);
      });
    },

    deletePolish({ commit }, id) {
      commit('REMOVE_POLISH', id);
    }
  },
  getters: {
    allPolishes: (state) => state.nailPolishes
  }
});
