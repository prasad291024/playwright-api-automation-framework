export function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] ${timestamp} - ${message}`);
  //console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
}
