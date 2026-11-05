import { ServicePage, serviceMetadata } from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("risk-management-compliance")!;

export const metadata = serviceMetadata(service);

export default function Page() {
  return <ServicePage service={service} />;
}
