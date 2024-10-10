import { shallowMount } from "@vue/test-utils";
import AboutView from '@/views/AboutView';

describe('Pruebas en el About View', () => {
    
    test('debe renderizar el componente ', () => {
        const wrapper = shallowMount(AboutView)
        expect(wrapper.html()).toMatchSnapshot()
    });
    
});