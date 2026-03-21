import { createStore } from 'vuex';
import { supabase } from '../supabase';

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
  { id: 'base-54', name: 'É mais que um golpe', brand: 'Impala', color: '', image: '/Imagens/é mais que um golpe - Impala.png' }
];

export default createStore({
  state: {
    user: null, // Sistema Supabase Auth
    nailPolishes: [],
    customPolishes: [],
    usages: [],
    wishlist: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_CUSTOM_POLISHES(state, polishes) {
      state.customPolishes = polishes;
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
    },
    ADD_POLISH(state, polish) {
      state.customPolishes.push(polish);
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
    },
    REMOVE_POLISH(state, id) {
      state.customPolishes = state.customPolishes.filter(p => p.id !== id);
      state.nailPolishes = [...basePolishes, ...state.customPolishes];
    },
    SET_USAGES(state, usages) {
      state.usages = usages;
    },
    ADD_USAGE(state, usage) {
      state.usages.unshift(usage);
    },
    REMOVE_USAGE(state, id) {
      state.usages = state.usages.filter(u => u.id !== id);
    },
    UPDATE_USAGE(state, updatedUsage) {
      const index = state.usages.findIndex(u => u.id === updatedUsage.id);
      if (index !== -1) {
        state.usages.splice(index, 1, updatedUsage);
      }
    },
    SET_WISHLIST(state, items) {
      state.wishlist = items;
    },
    ADD_WISHLIST(state, item) {
      state.wishlist.unshift(item);
    },
    REMOVE_WISHLIST(state, id) {
      state.wishlist = state.wishlist.filter(w => w.id !== id);
    }
  },
  actions: {
    // ----------------------------------------
    // SUPABASE AUTHENTICATION ACTIONS
    // ----------------------------------------
    async signUp({ commit }, { email, password }) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    },
    async signIn({ commit }, { email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      commit('SET_USER', data.user);
      return data;
    },
    async signOut({ commit }) {
      await supabase.auth.signOut();
      commit('SET_USER', null);
      // Limpa dados privados ao deslogar
      commit('SET_CUSTOM_POLISHES', []);
      commit('SET_USAGES', []);
      commit('SET_WISHLIST', []);
    },

    // ----------------------------------------
    // DATABASE DATA ACTIONS
    // ----------------------------------------
    async loadFromStorage({ commit, state }) {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('substitua')) {
        console.warn("Supabase não configurado no .env! Sem acesso aos dados.");
        return;
      }
      if (!state.user) return; // Só carrega se tiver logado
      
      try {
        // Agora filtramos puxando exatamento os esmaltes deste usuário
        const { data: polishes } = await supabase.from('polishes').select('*').eq('user_id', state.user.id);
        if (polishes) commit('SET_CUSTOM_POLISHES', polishes);
        
        const { data: usages } = await supabase.from('usages').select('*').eq('user_id', state.user.id).order('date', { ascending: false });
        if (usages) commit('SET_USAGES', usages);
        
        const { data: wList } = await supabase.from('wishlists').select('*').eq('user_id', state.user.id).order('dateAdded', { ascending: false });
        if (wList) commit('SET_WISHLIST', wList);
      } catch (err) {
        console.error("Erro carregando Supabase", err);
      }
    },
    
    async addNailPolish({ commit, state }, { name, brand, color, finish, colorFamily, expirationDate, volume, imageFile }) {
      return new Promise(async (resolve, reject) => {
        if (!state.user) return reject('Usuário não autenticado');

        const payload = {
             id: Date.now().toString(),
             user_id: state.user.id, // Vínculo Multi-usuário
             name,
             brand,
             color,
             finish: finish || null,
             "colorFamily": colorFamily || null,
             "expirationDate": expirationDate || null,
             volume: volume ? parseFloat(volume) : null,
             image: null
        };

        const executePush = async () => {
           const { error } = await supabase.from('polishes').insert([payload]);
           if (error) console.error("Database falhou", error);
           commit('ADD_POLISH', payload);
           resolve();
        };

        if (!imageFile) {
          await executePush();
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
          payload.image = reader.result; 
          await executePush();
        };
        reader.onerror = (error) => reject(error);
      });
    },

    async deletePolish({ commit }, id) {
      const { error } = await supabase.from('polishes').delete().eq('id', id);
      if (!error) commit('REMOVE_POLISH', id);
    },

    async addUsage({ commit, state }, { polishIds, imageFile, notes, rating, usageType }) {
      return new Promise(async (resolve, reject) => {
        if (!state.user) return reject('Usuário não autenticado');

        const usageData = {
          id: Date.now().toString(),
          user_id: state.user.id, // Vínculo Multi-usuário
          "polishIds": polishIds, 
          date: new Date().toISOString(),
          notes,
          rating: rating || 0,
          "usageType": usageType || 'hands',
          photo: null
        };

        const executePush = async () => {
           const { error } = await supabase.from('usages').insert([usageData]);
           if (error) console.error("Database falhou", error);
           commit('ADD_USAGE', usageData);
           resolve();
        };

        if (!imageFile) {
          await executePush();
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
          usageData.photo = reader.result;
          await executePush();
        };
        reader.onerror = (error) => reject(error);
      });
    },

    async updateUsage({ commit, state }, { id, polishIds, imageFile, notes, rating, usageType }) {
      return new Promise(async (resolve, reject) => {
        if (!state.user) return reject('Usuário não logado');

        const existingUsage = state.usages.find(u => u.id === id);
        if (!existingUsage) return reject('Registro não encontrado');

        const usageData = {
          ...existingUsage,
          "polishIds": polishIds, 
          notes,
          rating: rating || 0,
          "usageType": usageType || 'hands'
        };
        delete usageData.polishId;

        const executePush = async () => {
           const { error } = await supabase.from('usages').update(usageData).eq('id', id);
           if (error) console.error("Database falhou", error);
           commit('UPDATE_USAGE', usageData);
           resolve();
        };

        if (imageFile === 'keep') {
           await executePush();
           return;
        } else if (!imageFile) {
           usageData.photo = null;
           await executePush();
           return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = async () => {
          usageData.photo = reader.result;
          await executePush();
        };
        reader.onerror = (error) => reject(error);
      });
    },

    async deleteUsage({ commit }, id) {
      const { error } = await supabase.from('usages').delete().eq('id', id);
      if (!error) commit('REMOVE_USAGE', id);
    },

    async addWishlistItem({ commit, state }, { name, brand, color }) {
      if (!state.user) return; // Prevent if not logged in

      const wishData = {
        id: Date.now().toString(),
        user_id: state.user.id, // Vínculo Multi-usuário
        name,
        brand,
        color,
        "dateAdded": new Date().toISOString()
      };
      
      const { error } = await supabase.from('wishlists').insert([wishData]);
      if (!error) commit('ADD_WISHLIST', wishData);
      else console.error(error);
    },

    async removeWishlistItem({ commit }, id) {
      const { error } = await supabase.from('wishlists').delete().eq('id', id);
      if (!error) commit('REMOVE_WISHLIST', id);
    }
  },
  getters: {
    allPolishes: (state) => state.nailPolishes,
    allUsages: (state) => state.usages,
    wishlistItems: (state) => state.wishlist,
    
    // Calcula quantos usos cada esmalte teve e a média de avaliação
    usageStats: (state) => {
      const stats = {};
      state.usages.forEach(usage => {
        // Suporta registros velhos que tinham apenas 'polishId' ou novos com 'polishIds'
        const ids = usage.polishIds && usage.polishIds.length > 0 
          ? usage.polishIds 
          : (usage.polishId ? [usage.polishId] : []);
          
        ids.forEach(id => {
          if (!stats[id]) {
            stats[id] = { count: 0, totalRating: 0, ratingCount: 0 };
          }
          stats[id].count++;
          if (usage.rating > 0) {
            stats[id].totalRating += usage.rating;
            stats[id].ratingCount++;
          }
        });
      });

      // Retorna array ordenado do mais usado para o menos
      return Object.keys(stats).map(polishId => {
        const polish = state.nailPolishes.find(p => p.id === polishId);
        const st = stats[polishId];
        const averageRating = st.ratingCount > 0 ? (st.totalRating / st.ratingCount) : 0;
        
        return {
          polishId,
          count: st.count,
          averageRating: parseFloat(averageRating.toFixed(1)),
          polishName: polish ? polish.name : 'Desconhecido',
          polishBrand: polish ? polish.brand : '',
          polishColor: polish ? polish.color : '',
          polishImage: polish ? polish.image : null
        };
      }).sort((a, b) => b.count - a.count);
    },

    getPolishRating: (state, getters) => (id) => {
      const stat = getters.usageStats.find(s => s.polishId === id);
      return stat ? stat.averageRating : 0;
    },

    // Retorna os esmaltes cadastrados na utilidade mais recente
    lastUsedPolish: (state, getters) => {
      if (state.usages.length === 0) return null;
      const latestUsage = state.usages[0]; // Como é unshift, o índice 0 é o mais recente
      
      const IDs = latestUsage.polishIds && latestUsage.polishIds.length > 0 
          ? latestUsage.polishIds 
          : (latestUsage.polishId ? [latestUsage.polishId] : []);
          
      const polishes = IDs.map(id => state.nailPolishes.find(p => p.id === id)).filter(Boolean);
      
      return {
        usageDate: latestUsage.date,
        polishes
      };
    },

    polishMetrics: (state) => (polishId) => {
      const polish = state.nailPolishes.find(p => p.id === polishId);
      if (!polish) return null;

      const metrics = {
        isExpired: false,
        expiresSoon: false,
        daysToExpiration: null,
        totalVolume: polish.volume || 0,
        consumedVolume: 0,
        remainingVolume: polish.volume || 0,
        volumePercentage: 100
      };

      if (polish.expirationDate) {
        const today = new Date();
        const expDate = new Date(polish.expirationDate);
        today.setHours(0,0,0,0);
        expDate.setHours(0,0,0,0);

        const diffTime = expDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        metrics.daysToExpiration = diffDays;
        if (diffDays < 0) {
          metrics.isExpired = true;
        } else if (diffDays <= 30) {
          metrics.expiresSoon = true;
        }
      }

      if (metrics.totalVolume > 0) {
        const uses = state.usages.filter(u => {
           const ids = u.polishIds && u.polishIds.length > 0 ? u.polishIds : (u.polishId ? [u.polishId] : []);
           return ids.includes(polishId);
        });

        uses.forEach(u => {
          let consumption = 0;
          if (u.usageType === 'feet') consumption = 0.25;
          else if (u.usageType === 'both') consumption = 0.65;
          else consumption = 0.40;
          
          metrics.consumedVolume += consumption;
        });

        metrics.remainingVolume = Math.max(0, metrics.totalVolume - metrics.consumedVolume);
        metrics.volumePercentage = Math.round((metrics.remainingVolume / metrics.totalVolume) * 100);
      }

      return metrics;
    }
  }
});
