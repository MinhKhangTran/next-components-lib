import { IData, readComponentById } from "@/utils/Fauna";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import axios from "axios";
import { useRouter } from "next/dist/client/router";

const SingleComponent = ({ component }: { component: IData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
  });
  useEffect(() => {
    setFormData({
      name: component.data.name,
      description: component.data.description,
      code: component.data.code,
    });
  }, []);

  const deleteComponent = async () => {
    try {
      await axios.delete("/api/delete-component", {
        data: { id: component.id },
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup.string().required("Ein Name ist nötig!"),
      description: Yup.string().required("Eine Beschreibung ist nötig!"),
      code: Yup.string().required("Ein Code ist nötig!"),
    }),
    onSubmit: async (daten, { resetForm }) => {
      // console.log(daten);
      try {
        setLoading(true);
        await axios.put("/api/update-component", {
          id: component.id,
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

        <ButtonGroup>
          <Button
            isLoading={loading}
            as="button"
            type="submit"
            colorScheme="red"
            mt={4}
            mb={8}
          >
            Ändern
          </Button>
          <Button
            isLoading={loading}
            as="button"
            type="button"
            colorScheme="red"
            mt={4}
            mb={8}
            variant="outline"
            onClick={deleteComponent}
          >
            Löschen
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default SingleComponent;

export async function getServerSideProps(context: any) {
  try {
    const id = context.params.id;
    const component = await readComponentById(id);
    return {
      props: { component },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
}
