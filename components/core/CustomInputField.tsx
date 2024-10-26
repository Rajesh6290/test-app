"use client";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  InputProps,
  MenuItem,
  Radio,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import React, {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  HTMLInputTypeAttribute,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaEye } from "react-icons/fa6";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  type?: HTMLInputTypeAttribute;
  value?: string | number | string[] | File;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  link?: string;
  error?: boolean;
  key?: string | number;
  helperText?: string | false;
  fullWidth?: boolean;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  options?: { label: string | number; value: string | number | any }[];
  id?: string | number;
  variant?: "filled" | "outlined" | "standard";
  InputProps?: InputProps;
  multiline?: boolean;
  rows?: number;
  defaultValue?: string | number | [] | object;
  label?: string;
  size?: "small" | "medium";
  formik?: FormikProps<{
    [key: string]: string;
  }>;
  labelPlacement?: "bottom" | "top" | "start" | "end" | undefined;
  checkedIcon?: React.ReactNode;
  checkboxIcon?: React.ReactNode;
  marks?: boolean | { value: number; label: number }[];
  step?: number;
  valueLabelDisplay?: "auto" | "on" | "off";
  orientation?: "horizontal" | "vertical";
  min?: number;
  max?: number;
  loading?: boolean;
  fileSize?: number;
  setAutoCompleteValue?: Dispatch<SetStateAction<string>>;
  fileAccept?: string;
  allOnChange?: any;
}

const CustomInputField = ({
  type = "text",
  link,
  value,
  label,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth,
  placeholder,
  name,
  disabled,
  InputProps,
  id,
  variant,
  options,
  rows,
  multiline,
  defaultValue,
  size,
  formik,
  labelPlacement,
  checkedIcon,
  checkboxIcon,
  marks,
  step,
  valueLabelDisplay = "on",
  orientation = "horizontal",
  min = 0,
  max = 100,
  loading,
  fileSize = 200, //accepts 200kb in size,
  setAutoCompleteValue,
  fileAccept,
  allOnChange,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  // const { theme: modeTheme } = useTheme();
  // const theme = createTheme({
  //   palette: {
  //     mode: modeTheme as any,
  //     primary: {
  //       main: modeTheme === "light" ? "#1976d2" : "#90caf9",
  //     },
  //     background: {
  //       default: modeTheme === "light" ? "#ffffff" : "#121212",
  //       paper: modeTheme === "light" ? "#f5f5f5" : "#1e1e1e",
  //     },
  //     text: {
  //       primary: modeTheme === "light" ? "#000000" : "#ffffff",
  //     },
  //   },
  // });
  switch (type) {
    case "text":
    case "email":
      return (
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          size={size}
          id={String(id)}
          type={type}
          label={label}
          disabled={disabled}
          variant={variant}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );

    case "select":
      return (
        <FormControl fullWidth>
          <TextField
            fullWidth={fullWidth}
            id={String(id)}
            size={size}
            select={true}
            name={name}
            value={value}
            variant={variant}
            onChange={onChange}
            disabled={disabled}
            label={label}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          >
            {options &&
              options?.map((option) => (
                <MenuItem key={option?.value} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))}
          </TextField>
        </FormControl>
      );
    default:
      return (
        <TextField
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          size={size}
          type={type}
          id={String(id)}
          variant={variant}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
  }
};

export default CustomInputField;


