import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import axios from "axios";
import { useRouter } from "next/dist/client/router";

const ComponentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: { name: "", description: "", code: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Ein Name ist nötig!"),
      description: Yup.string().required("Eine Beschreibung ist nötig!"),
      code: Yup.string().required("Ein Code ist nötig!"),
    }),
    onSubmit: async (daten, { resetForm }) => {
      // console.log(daten);
      try {
        setLoading(true);
        await axios.post("/api/create-component", {
          name: daten.name,
          description: daten.description,
          code: daten.code,
        });

        router.push("/");
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.response);
        resetForm();
        setLoading(false);
      }
    },
  });

  return (
    <Box mt={8}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={!!formik.errors.name && formik.touched.name}
          id="name"
          mt={4}
          isDisabled={loading}
        >
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            type="text"
            {...formik.getFieldProps("name")}
          ></Input>
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.errors.description && formik.touched.description}
          id="description"
          mt={4}
          isDisabled={loading}
        >
          <FormLabel>Beschreibung</FormLabel>
          <Textarea
            placeholder="Beschreibung"
            type="text"
            {...formik.getFieldProps("description")}
          ></Textarea>
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.errors.code && formik.touched.code}
          id="code"
          mt={4}
          isDisabled={loading}
        >
          <FormLabel>Code</FormLabel>
          <Textarea
            placeholder="Beschreibung"
            type="text"
            variant="filled"
            {...formik.getFieldProps("code")}
          ></Textarea>
          <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
        </FormControl>

        <Button
          isLoading={loading}
          as="button"
          type="submit"
          colorScheme="red"
          mt={4}
          mb={8}
        >
          Speichern
        </Button>
      </form>
    </Box>
  );
};

export default ComponentForm;
