import React, {useState} from 'react';
import {Button, Input, Slider} from 'antd';
import {RelativeWrapper, AbsoluteWrapper, FiltersContainer, FiltersRaw,
    SearchContainer, StyledSelect, SvgProducts} from './styles';
const { Search } = Input;

//ToDo: Унифицировать компонент
export default function FiltersDropDown({onQueryChange, options1, options2}) {
    const [showFilters, setShowFilters] = useState(false);
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [exclude, setExclude] = useState([]);
    const [ages, setAges] = useState([4, 24]);

    const handleSearchChange = e => {
        const query = e.target.value.trim();
        onQueryChange(makeQueryString(query, products, tags));
        setQuery(query);
    };

    const makeQueryString = (query, products, tags, exclude, ages) =>
        `${query ? `&query=${query}` : ''}` +
        `${products && products.length ? `&productIds=${products.map(i => i._id)}` : ''}` +
        `${tags && tags.length ? `&tags=${tags.map(i => i._id)}` : ''}` +
        `${exclude && exclude.length ? `&exclude=${exclude.map(i => i._id)}` : ''}` +
        `${ages && ages.length ? `&minAge=${ages[0]}&maxAge=${ages[1]}` : ''}`;

    const handleTagsChange = selectedTags => {
        onQueryChange(makeQueryString(query, products, selectedTags, exclude, ages));
        setTags(selectedTags);
    };

    const handleProductChange = selectedProducts => {
        onQueryChange(makeQueryString(query, selectedProducts, tags, exclude, ages));
        setProducts(selectedProducts);
    };

    const handleExcludeChange = selectedExclude => {
        onQueryChange(makeQueryString(query, products, tags, selectedExclude, ages));
        setExclude(selectedExclude);
    };

    const handleAgeChange = selectedAges => {
        onQueryChange(makeQueryString(query, products, tags, exclude, selectedAges));
        setAges(selectedAges);
    };

    const styles = {
        container: styles => ({
            ...styles,
            width: '100%',
        }),
        control: styles => ({
            ...styles,
            borderRadius: '0 4px 4px 0',
        })
    };

    return (
     <RelativeWrapper>
        <AbsoluteWrapper open={showFilters}>
            <SearchContainer>
                <Search placeholder="Поиск по ключевому слову" onChange={handleSearchChange} enterButton/>
                <Button style={{marginLeft: '5px'}} type="primary" icon="filter" onClick={()=>setShowFilters(!showFilters)}/>
            </SearchContainer>

            {showFilters && (
                <FiltersContainer>
                    <div style={{fontWeight: 'bold'}}>Обязательные продукты</div>
                    <FiltersRaw>
                        <SvgProducts/>
                        <StyledSelect
                            isMulti
                            name="products"
                            defaultValue={products}
                            options={options1}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Выберите продукты"
                            closeMenuOnSelect={false}
                            key="products"
                            onChange={handleProductChange}
                            styles={styles}
                         />
                    </FiltersRaw>

                    <div style={{fontWeight: 'bold'}}>Исключить продукты</div>
                    <FiltersRaw>
                        <SvgProducts/>
                        <StyledSelect
                            isMulti
                            name="exclude"
                            defaultValue={exclude}
                            options={options1}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Исключить продукты"
                            closeMenuOnSelect={false}
                            key="exclude"
                            onChange={handleExcludeChange}
                            styles={styles}
                         />
                     </FiltersRaw>

                    <div style={{fontWeight: 'bold'}}>Теги</div>
                    <FiltersRaw>
                        <SvgProducts/>
                        <StyledSelect
                            isMulti
                            name="tags"
                            defaultValue={tags}
                            options={options2}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Выберите тэги"
                            closeMenuOnSelect={false}
                            key="tags"
                            onChange={handleTagsChange}
                            styles={styles}
                        />
                     </FiltersRaw>

                     <div style={{fontWeight: 'bold'}}>Возраст</div>
                     <Slider
                         range
                         value={ages}
                         onChange={handleAgeChange}
                         min={4}
                         max={24}
                         style={{width: '100%'}}
                         marks = {{4: '4м', 6: '6м',12: '12м', 24: '24м' }}
                         dots
                         //tooltipVisible
                         //tooltipPlacement="bottom"
                     />
                 </FiltersContainer>
            )}
        </AbsoluteWrapper>
     </RelativeWrapper>
    )
}