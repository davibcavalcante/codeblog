import Select from 'react-select';

const DataList = ({ saveOptions, optionsTags, placeholder, type }) => {

    const handleChange = (selectedOptions) => {

        if (type === 'single') {
            saveOptions(selectedOptions.value)
        } else {
            saveOptions(selectedOptions)
        }
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '40px',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#000',
            fontFamily: 'Poppins',
            fontSize: '1.2rem',
        }),
    };

    return (
        <div>
            <Select
                isMulti={type === 'single' ? false : true}
                name="tags"
                options={optionsTags}
                className="basic-multi-select outline-none"
                classNamePrefix="select"
                onChange={handleChange}
                placeholder={placeholder}
                styles={customStyles}
            />
        </div>
    );

}

export default DataList;