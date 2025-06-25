import { UserWithHosts } from '@/services/firebase';

interface HostOwnerCardProps {
  user: UserWithHosts;
}

export function HostOwnerCard({ user }: HostOwnerCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-600">
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-bold text-base text-gray-900 leading-tight">
              {user.name || 'Sin nombre'} {user.surname || ''}
            </div>
            <div className="text-xs text-gray-500 font-mono break-all">
              ID: {user.id}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="uppercase text-xs text-gray-500 font-semibold tracking-wider mb-1">EMAIL</div>
          <div className="text-base text-gray-800 font-medium">{user.email}</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="uppercase text-xs text-gray-500 font-semibold tracking-wider mb-2 text-center sm:text-left">HOSTS</div>
        <div className="space-y-3">
          {user.hosts.map((host) => (
            <div
              key={host.id}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
            >
              <div>
                <div className="font-semibold text-gray-800 text-base leading-tight">
                  {host.name}
                </div>
                <div className="text-sm text-gray-600 leading-tight">
                  {host.address}
                </div>
              </div>
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                Activo
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 