import "next-auth";

interface Link {
  nombre: string;
  ruta: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      token: string;
      nombreUsuario: string;
      accesos: Array<Array<Link>>;
    }
  }
}
