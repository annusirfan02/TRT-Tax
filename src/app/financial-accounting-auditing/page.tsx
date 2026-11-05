import { ServicePage, serviceMetadata } from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("financial-accounting-auditing")!;

export const metadata = serviceMetadata(service);

export default function Page() {
  return <ServicePage service={service} />;
}
