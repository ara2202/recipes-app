import React, {useState} from 'react';
import {Button, Input, Slider} from 'antd';
import {FilterTwoTone, FilterFilled, FilterOutlined} from '@ant-design/icons';
import {s} from './styles';
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

    const filtersApplied = () =>
        query?.length || products?.length || tags?.length || exclude?.length || ages[0]!==4 || ages[1] !==24;

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

    const iconStyle = {
      fontSize: '24px',
      color: filtersApplied() ? "#ED1E79" : 'white',
    };

    return (
     <s.RelativeWrapper>
        <s.AbsoluteWrapper open={showFilters}>
            <s.SearchContainer>
                <Search placeholder="Поиск по ключевому слову" onChange={handleSearchChange} enterButton/>
                <Button
                    style={{marginLeft: '5px'}}
                    type="primary"
                    //icon={<FilterTwoTone style= {iconStyle} twoToneColor="#ED1E79"/>}
                    //icon={<FilterFilled style={iconStyle}/>}
                    icon={<FilterOutlined style={iconStyle}/>}
                    //icon="filter"
                    onClick={()=>setShowFilters(!showFilters)}
                >
                </Button>
            </s.SearchContainer>

            {showFilters && (
                <s.FiltersContainer>
                    <div style={{fontWeight: 'bold'}}>Обязательные продукты</div>
                    <s.FiltersRaw>
                        <s.SvgProducts/>
                        <s.StyledSelect
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
                    </s.FiltersRaw>

                    <div style={{fontWeight: 'bold'}}>Исключить продукты</div>
                    <s.FiltersRaw>
                        <s.SvgProducts/>
                        <s.StyledSelect
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
                     </s.FiltersRaw>

                    <div style={{fontWeight: 'bold'}}>Теги</div>
                    <s.FiltersRaw>
                        <s.SvgProducts/>
                        <s.StyledSelect
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
                     </s.FiltersRaw>

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
                     />
                 </s.FiltersContainer>
            )}
        </s.AbsoluteWrapper>
     </s.RelativeWrapper>
    )
}