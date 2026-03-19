import { createStore } from 'vuex';

const STORAGE_KEY = 'nail-polish-catalog';
const USAGES_STORAGE_KEY = 'nail-polish-usages';

const basePolishes = [
  { id: 'base-1', name: 'Gabriela', brand: 'Risqué', color: '', image: '/Imagens/Gabriela - Risqué.png' },
  { id: 'base-2', name: 'Jabuticaba', brand: 'Colorama', color: '', image: '/Imagens/Jabuticaba - Colorama.png' },
  { id: 'base-3', name: 'Jackie', brand: 'Impala', color: '', image: '/Imagens/Jackie - Impala.png' },
  { id: 'base-4', name: 'Léo mandou flores', brand: 'Risqué', color: '', image: '/Imagens/Léo mandou flores - Risqué.png' },
  { id: 'base-5', name: 'Malbec', brand: 'Anita', color: '', image: '/Imagens/Malbec - Anita.png' },
  { id: 'base-6', name: 'Plutão', brand: 'colortrend', color: '', image: '/Imagens/Plutão - colortrend.png' },
  { id: 'base-7', name: 'A mil por hora metal like', brand: 'Impala', color: '', image: '/Imagens/a mil por hora metal like - Impala.png' },
  { id: 'base-8', name: 'Azulivre mente', brand: 'Risqué', color: '', image: '/Imagens/azulivre mente - Risqué.png' },
  { id: 'base-9', name: 'Beijo', brand: 'Risqué', color: '', image: '/Imagens/beijo - Risqué.png' },
  { id: 'base-10', name: 'Beterraba', brand: 'Impala', color: '', image: '/Imagens/beterraba - Impala.png' },
  { id: 'base-11', name: 'Bianco puríssimo', brand: 'Risqué', color: '', image: '/Imagens/bianco puríssimo - Risqué.png' },
  { id: 'base-12', name: 'Café café', brand: 'Impala', color: '', image: '/Imagens/café café - Impala.png' },
  { id: 'base-13', name: 'Camafeu', brand: 'Anita', color: '', image: '/Imagens/camafeu - Anita.png' },
  { id: 'base-14', name: 'Cancela julgamentos', brand: 'Risqué', color: '', image: '/Imagens/cancela julgamentos - Risqué.png' },
  { id: 'base-15', name: 'Carmim', brand: 'Risqué', color: '', image: '/Imagens/carmim - Risqué.png' },
  { id: 'base-16', name: 'Cereja', brand: 'Colorama', color: '', image: '/Imagens/cereja - Colorama.png' },
  { id: 'base-17', name: 'Confiante e imprevisível metal like', brand: 'Impala', color: '', image: '/Imagens/confiante e imprevisível metal like - Impala.png' },
  { id: 'base-18', name: 'Confiança', brand: 'brilho ativo', color: '', image: '/Imagens/confiança - brilho ativo.png' },
  { id: 'base-19', name: 'Descomplicado', brand: 'Impala', color: '', image: '/Imagens/descomplicado - Impala.png' },
  { id: 'base-20', name: 'Dizeres', brand: 'Impala', color: '', image: '/Imagens/dizeres - Impala.png' },
  { id: 'base-21', name: 'Doce pérola', brand: 'Risqué', color: '', image: '/Imagens/doce pérola - Risqué.png' },
  { id: 'base-22', name: 'Encanto', brand: 'brilho ativo', color: '', image: '/Imagens/encanto - brilho ativo.png' },
  { id: 'base-23', name: 'Estrela do rodeio', brand: 'Impala', color: '', image: '/Imagens/estrela do rodeio - Impala.png' },
  { id: 'base-24', name: 'Fashion prata', brand: 'bellia', color: '', image: '/Imagens/fashion prata – bellia.png' },
  { id: 'base-25', name: 'Gold vibes', brand: 'Risqué', color: '', image: '/Imagens/gold vibes - Risqué.png' },
  { id: 'base-26', name: 'Granulado rosé', brand: 'Risqué', color: '', image: '/Imagens/granulado rosé - Risqué.png' },
  { id: 'base-27', name: 'Hortelã', brand: 'colortrend (Avon)', color: '', image: '/Imagens/hortelã - colortrend (Avon).png' },
  { id: 'base-28', name: 'Infinito', brand: 'Impala', color: '', image: '/Imagens/infinito - Impala.png' },
  { id: 'base-29', name: 'Irreverente, sincero', brand: 'Impala (Netflix)', color: '', image: '/Imagens/irreverente, sincero - Impala (Netflix).png' },
  { id: 'base-30', name: 'Labrador chocolate', brand: 'Studio 35', color: '', image: '/Imagens/labrador chocolate - Studio 35.png' },
  { id: 'base-31', name: 'Lavanda alma', brand: 'Risqué', color: '', image: '/Imagens/lavanda alma - Risqué.png' },
  { id: 'base-32', name: 'Maçã do amor', brand: 'Risqué', color: '', image: '/Imagens/maçã do amor - Risqué.png' },
  { id: 'base-33', name: 'Metal red', brand: 'cora Black 12', color: '', image: '/Imagens/metal red - cora Black 12.png' },
  { id: 'base-34', name: 'Mini saia', brand: 'Risqué', color: '', image: '/Imagens/mini saia - Risqué.png' },
  { id: 'base-35', name: 'Na mira 3d', brand: 'Impala', color: '', image: '/Imagens/na mira 3d - Impala.png' },
  { id: 'base-36', name: 'Nego drama', brand: 'brilho ativo', color: '', image: '/Imagens/nego drama - brilho ativo.png' },
  { id: 'base-37', name: 'Netuno', brand: 'colortrend (Avon)', color: '', image: '/Imagens/netuno - colortrend (Avon).png' },
  { id: 'base-38', name: 'Novo azul', brand: 'Risqué', color: '', image: '/Imagens/novo azul - Risqué.png' },
  { id: 'base-39', name: 'O táxi da Phoebe', brand: 'Risqué', color: '', image: '/Imagens/o táxi da Phoebe - Risqué.png' },
  { id: 'base-40', name: 'Obsessão', brand: 'Risqué', color: '', image: '/Imagens/obsessão - Risqué.png' },
  { id: 'base-41', name: 'Poder de muitas', brand: 'Risqué', color: '', image: '/Imagens/poder de muitas - Risqué.png' },
  { id: 'base-42', name: 'Polar', brand: 'Impala', color: '', image: '/Imagens/polar - Impala.png' },
  { id: 'base-43', name: 'Preto', brand: 'Impala', color: '', image: '/Imagens/preto - Impala.png' },
  { id: 'base-44', name: 'Pérola', brand: 'Risqué', color: '', image: '/Imagens/pérola - Risqué.png' },
  { id: 'base-45', name: 'Rainha da pista toda', brand: 'Risqué', color: '', image: '/Imagens/rainha da pista toda - Risqué.png' },
  { id: 'base-46', name: 'Rebu', brand: 'Risqué', color: '', image: '/Imagens/rebu - Risqué.png' },
  { id: 'base-47', name: 'Recuar', brand: 'brilho ativo', color: '', image: '/Imagens/recuar - brilho ativo.png' },
  { id: 'base-48', name: 'Selfie na floresta', brand: 'Impala', color: '', image: '/Imagens/selfie na floresta - Impala.png' },
  { id: 'base-49', name: 'Sem limites metal like', brand: 'Impala', color: '', image: '/Imagens/sem limites metal like - Impala.png' },
  { id: 'base-50', name: 'Sinistro, empolgante', brand: 'Impala', color: '', image: '/Imagens/sinistro, empolgante - Impala.png' },
  { id: 'base-51', name: 'Terracota que provoca', brand: 'Risqué', color: '', image: '/Imagens/terracota que provoca - Risqué.png' },
  { id: 'base-52', name: 'Vanguarda', brand: 'Risqué', color: '', image: '/Imagens/vanguarda - Risqué.png' },
  { id: 'base-53', name: 'Verde safira', brand: 'colortrend (Avon)', color: '', image: '/Imagens/verde safira - colortrend (Avon).png' },
  { id: 'base-54', name: 'É mais que um golpe', brand: 'Impala', color: '', image: '/Imagens/é mais que um golpe - Impala.png' },
];

export default createStore({
  state: {
    nailPolishes: [],
    customPolishes: [],
    usages: [] // { id, polishId, photo, date, notes }
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
    },
    SET_USAGES(state, usages) {
      state.usages = usages;
    },
    ADD_USAGE(state, usage) {
      state.usages.unshift(usage); // Add to the beginning
      localStorage.setItem(USAGES_STORAGE_KEY, JSON.stringify(state.usages));
    },
    REMOVE_USAGE(state, id) {
      state.usages = state.usages.filter(u => u.id !== id);
      localStorage.setItem(USAGES_STORAGE_KEY, JSON.stringify(state.usages));
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
      
      const storedUsages = localStorage.getItem(USAGES_STORAGE_KEY);
      if (storedUsages) {
        try {
          commit('SET_USAGES', JSON.parse(storedUsages));
        } catch(e) {
          commit('SET_USAGES', []);
        }
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
    },

    async addUsage({ commit }, { polishId, imageFile, notes }) {
      return new Promise((resolve, reject) => {
        const usageData = {
          id: Date.now().toString(),
          polishId,
          date: new Date().toISOString(),
          notes,
          photo: null
        };

        if (!imageFile) {
          commit('ADD_USAGE', usageData);
          resolve();
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          usageData.photo = reader.result;
          commit('ADD_USAGE', usageData);
          resolve();
        };
        reader.onerror = (error) => reject(error);
      });
    },

    deleteUsage({ commit }, id) {
      commit('REMOVE_USAGE', id);
    }
  },
  getters: {
    allPolishes: (state) => state.nailPolishes,
    allUsages: (state) => state.usages,
    
    // Calcula quantos usos cada esmalte teve
    usageStats: (state) => {
      const stats = {};
      state.usages.forEach(usage => {
        if (!stats[usage.polishId]) {
          stats[usage.polishId] = 0;
        }
        stats[usage.polishId]++;
      });

      // Retorna array ordenado do mais usado para o menos
      return Object.keys(stats).map(polishId => {
        const polish = state.nailPolishes.find(p => p.id === polishId);
        return {
          polishId,
          count: stats[polishId],
          polishName: polish ? polish.name : 'Desconhecido',
          polishBrand: polish ? polish.brand : '',
          polishColor: polish ? polish.color : '',
          polishImage: polish ? polish.image : null
        };
      }).sort((a, b) => b.count - a.count);
    },

    // Retorna o esmalte cadastrado na utilidade mais recente
    lastUsedPolish: (state, getters) => {
      if (state.usages.length === 0) return null;
      const latestUsage = state.usages[0]; // Como é unshift, o índice 0 é o mais recente
      const polish = state.nailPolishes.find(p => p.id === latestUsage.polishId);
      return {
        usageDate: latestUsage.date,
        polish
      };
    }
  }
});
