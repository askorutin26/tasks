import http from "http";
import router from "./router.js";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;
  const routes = router[request.method];

  const result = Object.keys(routes).find((str) => {
    const regexp = new RegExp(`^${str}$`);
    const matches = pathname.match(regexp);

    if (!matches) {
      return false;
    }
    routes[str](request, response, matches);
    return true;
  });
  if (!result) {
    response.writeHead(404);
    response.end();
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
