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
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const themeObject = {
    "& .MuiInputBase-root": {
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#121212",
      paddingBottom: "2px", // Adjust padding at the bottom of the input
      paddingTop: "4px", // Adjust padding at the top of the input
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "#ffffff" : "#333",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: isDarkMode ? "#888" : "#333",
    },
    "& .MuiInputLabel-root": {
      color: isDarkMode ? "#ffffff" : "#333", // Floating label color
      marginBottom: "2px", // Reduce margin below the label
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: isDarkMode ? "#ffffff" : "#3f51b5", // Color when the input is focused
    },
    "& .MuiInputLabel-root.Mui-error": {
      color: "red", // Color for error state
    },
    "& .MuiInputBase-root.Mui-error": {
      color: "red", // Input text color in error state
    },
    // Adjust the arrow icon color
    "& .MuiSelect-icon": {
      color: isDarkMode ? "#ffffff" : "#333", // Color of the arrow icon
    },
    // Reduce margin and padding of the form control and inputs
    "& .MuiFormControl-root": {
      marginBottom: "8px", // Reduce margin for spacing below the input
      marginTop: "4px",    // Reduce margin above the input
      padding: "0px",      // Remove padding for the form control
    },
    // You can also target specific input types if necessary
    "& .MuiFilledInput-root": {
      padding: "2px 8px", // Adjust padding for filled inputs
    },
    "& .MuiOutlinedInput-root": {
      padding: "2px 8px", // Adjust padding for outlined inputs
    },
  };

  switch (type) {
    case "text":
    case "email":
      return (
        <TextField
          inputProps={{
            style: {
              padding: 12
            }
          }}
          sx={themeObject}
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
    case "textarea":
      return (
        <TextField
          inputProps={{
            style: {
              padding: 12
            }
          }}
          sx={themeObject}
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          size={size}
          id={String(id)}
          type={"text"}
          disabled={disabled}
          variant={variant}
          label={label}
          rows={rows}
          multiline={multiline}
          InputProps={InputProps}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
    case "number":
      return (
        <TextField
          inputProps={{
            style: {
              padding: 12
            }
          }}
          sx={themeObject}
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          size={size}
          id={String(id)}
          type={"text"}
          label={label}
          disabled={disabled}
          variant={variant}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (
              !/^[0-9]$/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight" &&
              !(e.key === "a" && (e.ctrlKey || e.metaKey)) &&
              !(e.key === "x" && (e.ctrlKey || e.metaKey))
            )
              e.preventDefault();
          }}
          onBlur={onBlur}
          inputMode="numeric"
          error={error}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
    case "password":
      return (
        <TextField
          inputProps={{
            style: {
              padding: 12
            }
          }}
          sx={themeObject}
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          size={size}
          id={String(id)}
          label={label}
          type={showPassword ? "text" : type}
          disabled={disabled}
          variant={variant}
          InputProps={{
            ...InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <MdVisibility className="!text-text-primary text-xl" />
                  ) : (
                    <MdVisibilityOff className="!text-text-primary text-xl" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          multiline={multiline}
          rows={rows}
          helperText={helperText}
          defaultValue={defaultValue}
        />
      );
    case "custom-view-password":
      return (
        <div>
          <TextField
            inputProps={{
              style: {
                padding: 12
              }
            }}
            sx={themeObject}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            size={size}
            id={String(id)}
            label={label}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            variant={variant}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            helperText={helperText}
            defaultValue={defaultValue}
          />

          <div>
            <FormControlLabel
              checked={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              control={<Checkbox />}
              label="show password"
            />
          </div>
        </div>
      );
    case "file-no-preview":
      return (
        <>
          <TextField
            inputProps={{
              style: {
                padding: 12
              }
            }}
            sx={themeObject}
            id={String(id)}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            size={size}
            type="file"
            disabled={disabled}
            variant={variant}
            InputProps={{
              ...InputProps,
            }}
            onChange={(e) => {
              let event: ChangeEvent<HTMLInputElement> = e as any;
              let file = event?.target?.files && event?.target?.files[0];
              if (fileSize && file && file?.size / 1000 > fileSize && formik)
                formik?.setFieldError(
                  name!,
                  `Please select a file under size ${fileSize}`
                );
              formik && formik.setFieldValue(name!, file);
            }}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          />
        </>
      );
    case "multiple-file":
      return (
        <>
          <TextField

            sx={themeObject}
            id={String(id)}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            size={size}
            type="file"
            disabled={disabled}
            variant={variant}
            onChange={(e) => {
              let event: ChangeEvent<HTMLInputElement> = e as any;
              let files = event?.target?.files;

              if (fileSize && files && files.length > 0) {
                const totalSize = Array.from(files).reduce(
                  (acc, file) => acc + file.size,
                  0
                );

                if (totalSize / 1000 > fileSize && formik)
                  formik?.setFieldError(
                    name!,
                    `Please select file(s) under total size ${fileSize}`
                  );
              }

              formik && formik.setFieldValue(name!, files);
            }}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
            inputProps={{ accept: fileAccept, multiple: true }} // Set multiple directly on inputProps
          />
        </>
      );
    case "file-with-preview":
      return (
        <>
          <TextField
            inputProps={{
              style: {
                padding: 12
              }
            }}
            sx={themeObject}
            id={String(id)}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            size={size}
            type="file"
            disabled={disabled}
            variant={variant}
            InputProps={{
              ...InputProps,
              inputProps: {
                accept: "image/*,video/*",
              },
              endAdornment: (
                <InputAdornment position="end">
                  {formik?.values?.[name!] ? (
                    <IconButton onClick={() => setOpen(true)}>
                      <Tooltip title="View File">
                        <FaEye className="!text-red-600 text-xl" />
                      </Tooltip>
                    </IconButton>
                  ) : null}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              let event: ChangeEvent<HTMLInputElement> = e as any;
              let file = event?.target?.files && event?.target?.files[0];
              if (fileSize && file && file?.size / 1000 > fileSize && formik)
                formik?.setFieldError(
                  name!,
                  `Please select a file under size ${fileSize}`
                );
              formik && formik.setFieldValue(name!, file);
            }}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          />
          <FilePreview
            open={open}
            onClose={() => setOpen(false)}
            fileValue={value as File}
          />
        </>
      );
    case "checkbox":
      return (
        <FormControlLabel

          sx={themeObject}
          labelPlacement={labelPlacement}
          value={value}
          onChange={(e, newValue) => {
            formik && formik.setFieldValue(name!, newValue);
          }}
          control={
            <Checkbox
              checked={Boolean(value)}
              size={size}
              checkedIcon={checkedIcon} // pass the desire icon after click
              icon={checkboxIcon} // pass the desire icon before click
              sx={{
                color: "#005da6", // your primary color
                "&.Mui-checked": {
                  color: "#444791", // your primary dark color
                },
              }}
            />
          }
          label={label}
        />
      );
    case "audio":
      return (
        <>
          <TextField
            inputProps={{
              style: {
                padding: 12
              }
            }}
            sx={themeObject}
            id={String(id)}
            fullWidth={fullWidth}
            placeholder={placeholder}
            name={name}
            size={size}
            type="file"
            disabled={disabled}
            variant={variant}
            InputProps={{
              ...InputProps,
              inputProps: {
                accept: "audio/*", // Accepts only audio files
              },
              endAdornment: (
                <InputAdornment position="end">
                  {formik?.values?.[name!] ? (
                    <IconButton onClick={() => setOpen(true)}>
                      <Tooltip title="View File">
                        <FaEye className="!text-red-600 text-xl" />
                      </Tooltip>
                    </IconButton>
                  ) : null}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              let event: ChangeEvent<HTMLInputElement> = e as any;
              let file = event?.target?.files && event?.target?.files[0];
              if (fileSize && file && file?.size / 1000 > fileSize && formik)
                formik?.setFieldError(
                  name!,
                  `Please select a file under size ${fileSize}`
                );
              formik && formik.setFieldValue(name!, file);
            }}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          />
          <AudioPreview
            open={open}
            onClose={() => setOpen(false)}
            fileValue={value as File}
          />
        </>
      );

    case "checkbox-group":
      return (
        <FormGroup>
          {options &&
            options?.map((curOpt, i) => (
              <FormControlLabel

                sx={themeObject}
                key={i}
                labelPlacement={labelPlacement}
                value={curOpt.value}
                onChange={(e) => {
                  formik &&
                    formik.setFieldValue(name!, (e.target as any).value);
                }}
                control={
                  <Checkbox
                    checked={value === curOpt?.value}
                    size={size}
                    checkedIcon={checkedIcon} // pass the desire icon after click
                    icon={checkboxIcon} // pass the desire icon before click
                    sx={{
                      color: "#005da6", // your primary color
                      "&.Mui-checked": {
                        color: "#444791", // your primary dark color
                      },
                    }}
                  />
                }
                label={curOpt.label}
              />
            ))}
        </FormGroup>
      );
    case "radio":
      return (
        <FormControlLabel
          sx={themeObject}
          onChange={(e, newValue) => {
            formik && formik.setFieldValue(name!, newValue);
          }}
          value={value}
          control={
            <Radio
              size={size}
              sx={{
                color: "#005da6", // your primary color
                "&.Mui-checked": {
                  color: "#444791", // your primary dark color
                },
              }}
            />
          }
          label={label}
        />
      );
    case "radio-group":
      return (
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          {options &&
            options?.map((curOpt, i) => (
              <FormControlLabel
                sx={themeObject}
                key={i}
                labelPlacement={labelPlacement}
                value={curOpt.value}
                onChange={(e) => {
                  formik &&
                    formik.setFieldValue(name!, (e.target as any).value);
                }}
                control={
                  <Radio
                    checked={value === curOpt?.value}
                    size={size}
                    checkedIcon={checkedIcon} // pass the desire icon after click
                    icon={checkboxIcon} // pass the desire icon before click
                    sx={{
                      color: "#005da6", // your primary color
                      "&.Mui-checked": {
                        color: "#444791", // your primary dark color
                      },
                    }}
                  />
                }
                label={curOpt.label}
              />
            ))}
        </FormGroup>
      );
    case "slider":
      return (
        <Slider
          sx={{
            color: "#005da6", // your primary color
          }}
          orientation={orientation}
          getAriaLabel={() => "Temperature range"}
          onChange={(e, newValue) => {
            formik && formik.setFieldValue(name!, newValue);
          }}
          valueLabelDisplay={valueLabelDisplay}
          step={step}
          size={size}
          marks={marks}
          min={min}
          max={max}
        />
      );
    case "select":
      return (
        <FormControl fullWidth>
          <TextField
            inputProps={{
              style: {
                padding: 5
              }
            }}
            sx={themeObject}
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
            InputProps={InputProps}
            error={error}
            helperText={helperText}
            defaultValue={defaultValue}
          >
            {options?.map((option) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      );
    case "multi-select":
      return (
        <FormControl fullWidth>
          {label && label?.length > 0 && <InputLabel>{label}</InputLabel>}
          <Select
            inputProps={{
              style: {
                padding: 12
              }
            }}
            sx={themeObject}
            variant={variant}
            multiple
            value={(value as string[]) || []}
            onChange={(e) => {
              const value = e?.target?.value as string[];
              formik && formik.setFieldValue(name!, [...value]);
            }}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options?.map((option, i) => (
              <MenuItem key={i} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </Select>
          {error && <div className="text-xs text-red-500">{helperText}</div>}
        </FormControl>
      );
    case "autocomplete":
      return (
        <div className="w-full">
          <Autocomplete

            sx={themeObject}
            id={String(id)}
            loading={loading}
            // disableClearable
            disablePortal
            autoHighlight
            disabled={disabled}
            key={id}
            options={options ? options?.map((option) => option) : []}
            value={options?.find((data) => data?.value === value)?.label as any}
            onChange={(event, newValue) => {
              allOnChange?.(newValue);
              if (newValue?.value) {
                formik && formik.setFieldValue(name!, newValue?.value);
                setAutoCompleteValue && setAutoCompleteValue(newValue?.value);
              } else {
                formik && formik.setFieldValue(name!, "");
                setAutoCompleteValue && setAutoCompleteValue("");
              }
            }}
            noOptionsText={
              <div className="flex items-center gap-1">No Result Found</div>
            }
            renderInput={(params) => (
              <TextField

                {...params}
                value={value}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                fullWidth={fullWidth}
                placeholder={placeholder}
                name={name}
                variant={variant}
                id={String(id)}
                onBlur={onBlur}
                label={label}
                error={error}
                helperText={helperText}
              />
            )}
          />
        </div>
      );
    case "multi-autocomplete":
      return (
        <Autocomplete
          sx={themeObject}
          id={String(id)}
          loading={loading}
          multiple
          disabled={disabled}
          options={options!?.map((option) => option)}
          value={
            options && value && (value as any[])?.length > 0
              ? (options?.filter((curOpt) =>
                (value as any)?.some(
                  (curValue: any) => curValue?.value === curOpt.value
                )
              ) as any)
              : []
          }
          onChange={(event, newValue) => {
            if (newValue) formik && formik.setFieldValue(name!, newValue);
            else formik && formik.setFieldValue(name!, "");
          }}
          noOptionsText={
            <div className="flex items-center gap-1">No Result Found</div>
          }
          renderInput={(params) => (
            <TextField
              {...params}
              value={value}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              label={label}
              fullWidth={fullWidth}
              placeholder={placeholder}
              name={name}
              variant={variant}
              id={String(id)}
              onBlur={onBlur}
              error={error}
              helperText={helperText}
            />
          )}
        />
      );

    default:
      return (
        <TextField
          inputProps={{
            style: {
              padding: 12
            }
          }}
          sx={themeObject}
          fullWidth={fullWidth}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          size={size}
          type={type}
          id={String(id)}
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
  }
};

export default CustomInputField;

const FilePreview = ({
  open,
  onClose,
  fileValue,
}: {
  open: boolean;
  onClose: () => void;
  fileValue?: File;
}) => {
  const fileType = fileValue?.name?.split(".")[1];
  const filePreviewData = () => {
    switch (fileType) {
      case "jpg":
      case "png":
      case "jpeg":
      case "svg":
      case "webp":
        return (
          <img
            src={fileValue ? URL?.createObjectURL(fileValue) : ""}
            className="w-full object-cover h-80"
            alt="image"
          />
        );

      case "xlsx":
        return (
          <iframe
            src={fileValue ? URL?.createObjectURL(fileValue) : ""}
            height="200"
          ></iframe>
        );
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="p-5">
        {fileValue ? (
          <div className="relative flex flex-col gap-3 md:gap-5 w-full">
            {filePreviewData()}
            <button
              onClick={onClose}
              type="button"
              className="px-3 py-2 bg-primary text-white rounded-md"
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

const AudioPreview = ({ open, onClose, fileValue }: any) => {
  const [audioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    if (fileValue && fileValue.type.startsWith("audio")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setAudioURL(e.target.result);
        }
      };
      reader.readAsDataURL(fileValue);
    } else {
      setAudioURL(null);
    }
  }, [fileValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>File Preview</DialogTitle>
      <div className="w-full flex flex-col items-center overflow-x-hidden justify-center">
        <DialogContent className=" ">
          {audioURL ? (
            <audio controls>
              <source src={audioURL} type={fileValue?.type} />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <Typography>No preview available for this file type.</Typography>
          )}
        </DialogContent>
      </div>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
