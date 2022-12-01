import validator from "@/utils/validator";

export const Genders = [
  {
    value: 0,
    label: "Male",
  },
  {
    value: 1,
    label: "Female",
  },
];

export const Departments = [
  {
    value: "hr",
    label: "HR",
  },
  {
    value: "dev1",
    label: "DEV1",
  },
  {
    value: "dev2",
    label: "DEV2",
  },
  {
    value: "ccm",
    label: "CCM",
  },
];

export const Postions = [
  {
    value: 1,
    label: "Frontend developer",
  },
  {
    value: 2,
    label: "Backend developer",
  },
  {
    value: 3,
    label: "Fullstack developer",
  },
  {
    value: 4,
    label: "Solution architect",
  },
];

export const EnumGenders = {
  0: "Male",
  1: "Female",
};

export const EnumPositions = {
  1: "Frontend developer",
  2: "Backend developer",
  3: "Fullstack developer",
  4: "Solution architect",
};

export const Colors = {
  0: "success",
  1: "info",
  2: "danger",
  3: "warning",
};

export const Columns = [
  {
    id: 1,
    label: "Email",
    prop: "email",
  },
  {
    id: 2,
    label: "Telephone",
    prop: "phone",
  },
  {
    id: 3,
    label: "Gender",
    prop: "gender",
  },
  {
    id: 4,
    label: "Date of Birth",
    prop: "dob",
  },
  {
    id: 5,
    label: "Department",
    prop: "department",
  },
  {
    id: 6,
    label: "Position",
    prop: "position",
  },
  {
    id: 7,
    label: "Name",
    prop: "name",
  },
  {
    id: 8,
    label: "Address",
    prop: "address",
  },
];

export const Rules = {
  email: [
    { validator: validator.validateEmail, trigger: ["change", "blur"] },
    {
      required: true,
      message: "Please enter email address",
      trigger: ["change", "blur"],
    },
  ],
  phone: [
    { validator: validator.validatePhone, trigger: ["change", "blur"] },
    {
      required: true,
      message: "Please enter phone number",
      trigger: ["change", "blur"],
    },
  ],
  gender: [
    {
      required: true,
      message: "Please select gender",
      trigger: ["change", "blur"],
    },
  ],
  dob: [
    {
      required: true,
      message: "Please select date of birth",
      trigger: ["change", "blur"],
    },
  ],
  department: [
    {
      required: true,
      message: "Please select department",
      trigger: ["change", "blur"],
    },
  ],
  name: [
    {
      required: true,
      message: "Please select name",
      trigger: ["change", "blur"],
    },
  ],
  position: [
    {
      required: true,
      message: "Please select position",
      trigger: ["change", "blur"],
    },
  ],
};
