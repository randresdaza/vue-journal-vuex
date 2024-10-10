import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';
import authApi from '@/api/authApi';


const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

describe('Vuex - Pruebas en el Journal Module', () => {

    beforeAll(async () => {
        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })
        localStorage.setItem('idToken',data.idToken)
    })

    test('este es el estado inicial, debe tener este state', () => {
        const store = createVuexStore(journalState)
        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    });

    //Mutations
    test('Mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(4)

        expect(store.state.journal.isLoading).toBeFalsy()
    });

    test('Mutation: updateEntry ', () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: 'XYZ456',
            date: 'Dom Jul 18 2021',
            text: 'Esta es la segunda entrada'
        }
        store.commit('journal/updateEntries', updatedEntry)

        const storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(2)
        expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    });

    test('Mutations: addEntry deleteEntry', () => {
        const store = createVuexStore(journalState)
        const addEntry = {
            id: 'ABC-123',
            text: 'Hola Mundo'
        }
        store.commit('journal/addEntry', addEntry)
        const storeEntries = store.state.journal.entries
        expect(storeEntries.length).toBe(3)
        expect(storeEntries.find(e => e.id === addEntry.id)).toBeTruthy()

        store.commit('journal/deleteEntry', addEntry.id)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === addEntry.id)).toBeFalsy()
    });

    test('Getters: getEntriesByTerm getEntryById', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('mundo').length).toBe(1)
        expect(store.getters['journal/getEntriesByTerm']('mundo')).toEqual([entry1])

        expect(store.getters['journal/getEntryById']('-NcnQ8hmq8B0x7FhcuLJ')).toEqual(entry1)
    });

    test('Actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(3)
    });

    test('Actions: updateEntry', async () => {
        const store = createVuexStore(journalState)
        const updatedEntry = {
            id: '-NcnQ8hmq8B0x7FhcuLJ',
            date: '-1693079864461',
            text: "Hola mundo test",
            otroCampo: true,
            otroMas: { a: 1 }
        }
        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({
            id: '-NcnQ8hmq8B0x7FhcuLJ',
            date: '-1693079864461',
            text: "Hola mundo test",
        })
    });

    test('Actions: createEntry deleteEntry', async () => {
        const store = createVuexStore(journalState)

        const newEntry = { date: -1693079864461, text: 'Nueva entrada desde las pruebas' }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect(typeof id).toBe('string')

        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)

        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
    });
});