import faunadb from "faunadb";
export const faunaClient = new faunadb.Client({
  secret: `${process.env.FAUNA_SECRET}`,
});
export const q = faunadb.query;

interface IComponent {
  name: string;
  description: string;
  code: string;
  userId: string;
}
export interface IData {
  data: IComponent;
  ts: number;
  id: string;
  ref?: any;
}

//===================================================================================================
//===================================READ COMPONENTS=================================================
//===================================================================================================

export const readComponents = async (): Promise<IData[]> => {
  // read components from db
  const { data }: { data: IData[] } = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("components-lib"))),
      q.Lambda("ref", q.Get(q.Var("ref")))
    )
  );
  const components = data.map((component) => {
    // add a new field id with the value from the ref
    component.id = component.ref.id;
    //delete the ref field
    delete component.ref;
    return component;
  });
  //   console.log(components);
  //   console.log(components);
  return components;
};

//===================================================================================================
//===================================CREATE COMPONENT================================================
//===================================================================================================

export const createComponent = async (
  code: string,
  description: string,
  name: string,
  userId: string
): Promise<IData> => {
  return await faunaClient.query(
    q.Create(q.Collection("components-lib"), {
      data: { code, description, name, userId },
    })
  );
};
//===================================================================================================
//===================================READ COMPONENT BY ID============================================
//===================================================================================================

export const readComponentById = async (id: string): Promise<IData> => {
  const component: IData = await faunaClient.query(
    q.Get(q.Ref(q.Collection("components-lib"), id))
  );

  // add a new field id with the value from the ref
  component.id = component.ref.id;
  //delete the ref field
  delete component.ref;
  return component;
};

//===================================================================================================
//===================================UPDATE COMPONENT================================================
//===================================================================================================

export const updateComponent = async (
  id: string,
  code: string,
  description: string,
  name: string,
  userId: string
): Promise<IData> => {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection("components-lib"), id), {
      data: { code, description, name, userId },
    })
  );
};

//===================================================================================================
//===================================DELETE COMPONENT================================================
//===================================================================================================

export const deleteComponent = async (id: string): Promise<IData> => {
  return await faunaClient.query(
    q.Delete(q.Ref(q.Collection("components-lib"), id))
  );
};
