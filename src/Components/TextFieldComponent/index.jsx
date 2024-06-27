import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { TextFieldComponent as TextField } from './styles';

const TextFieldComponent = ({
  id = '',
  name,
  label,
  control,
  type,
  fullWidth,
  select,
  children,
  defaultValue,
  rules,
  inputMask,
  buttonattached,
  disabled,
  ref,
  multiline,
  maxRows,
  rows,
  variant,
  color,
  onBlur
}) => {
  const masks = {
    antigo: 'aa-9999',
    padrao: 'aa*-9*99',
  };
  let mask = inputMask?.mask === 'placa' ? masks.padrao : inputMask?.mask;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (inputMask?.mask ? (

        <InputMask
          mask={mask}
          maskChar={inputMask?.maskChar}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(e);
            if (inputMask?.mask === 'placa') {
              if (!(/[a-zA-Z]/).test(e.target.value[2])) mask = masks.antigo;
              if (!e.target.value[2] || (e.target.value === '-' && !e.target.value[3])) mask = masks.padrao;
            }
          }}
        >
          {(inputProps) => (
            <TextField
              id={id}
              multiline={multiline}
              select={select}
              disabled={disabled}
              type={type}
              key={label}
              label={label}
              margin="normal"
              variant={variant}
              error={!!error}
              helperText={error?.message ? error?.message : ''}
              fullWidth={fullWidth}
              onChange={inputProps.onChange}
              value={inputProps.value}
              buttonattached={buttonattached ? 'true' : undefined}
              inputProps={{ ref }}
              maxRows={maxRows}
              rows={rows}
              color={color}
              onBlur={onBlur}
            >
              {children}
            </TextField>
          )}
        </InputMask>
      ) : (
        <TextField
          id={id}
          multiline={multiline}
          select={select}
          disabled={disabled}
          type={type}
          key={label}
          label={label}
          variant={variant}
          error={!!error}
          helperText={error?.message ? error?.message : ''}
          fullWidth={fullWidth}
          // InputLabelProps={type === 'date' ? { shrink: true } : {}}
          onChange={onChange}
          value={value}
          buttonattached={buttonattached ? 'true' : undefined}
          InputProps={{ className: type === 'date' && !value ? 'isEmpty' : '' }}
          maxRows={maxRows}
          rows={rows}
          color={color}
          onBlur={onBlur}
        >
          {children}
        </TextField>
      ))}
    />
  );
};
TextFieldComponent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  select: PropTypes.bool,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  buttonattached: PropTypes.bool,
  // eslint-disable-next-line
  control: PropTypes.any.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  defaultValue: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.number, PropTypes.string, PropTypes.array,
  ]),
  rules: PropTypes.any, // eslint-disable-line
  inputMask: PropTypes.shape({
    mask: PropTypes.string.isRequired,
    maskChar: PropTypes.string,

  }),
  ref: PropTypes.any, // eslint-disable-line
  maxRows: PropTypes.number,
  rows: PropTypes.number,
};
TextFieldComponent.defaultProps = {
  id: '',
  type: 'text',
  fullWidth: false,
  select: false,
  disabled: false,
  buttonattached: false,
  children: <></>,
  defaultValue: '',
  inputMask: { mask: '' },
  label: '',
  ref: undefined,
  multiline: false,
  maxRows: 1,
  rows: 1,
};
export default TextFieldComponent;
