import psycopg2
import socket

# Try to resolve the hostname first
try:
    hostname = "db.pjadppdroaymnihpjbwx.supabase.co"
    print(f"Trying to resolve hostname: {hostname}")
    ip_address = socket.gethostbyname(hostname)
    print(f"Successfully resolved to IP: {ip_address}")
except Exception as e:
    print(f"Hostname resolution failed: {e}")
    print("\nTrying alternative hostname format...")
    try:
        # Try alternative format (without 'db.' prefix)
        hostname_alt = "pjadppdroaymnihpjbwx.supabase.co"
        ip_address = socket.gethostbyname(hostname_alt)
        print(f"Alternative hostname resolved to IP: {ip_address}")
        print("Using this alternative in connection string...")
        hostname = f"db.{hostname_alt}"
    except Exception as e:
        print(f"Alternative hostname resolution also failed: {e}")
        print("\nPlease check your Supabase dashboard for the correct connection details.")

# Try with the standard Supabase connection string format
conn_string = f"postgresql://postgres:NutriGuard123@{hostname}:5432/postgres"
print(f"\nAttempting connection with: {conn_string}")
   
try:
    conn = psycopg2.connect(conn_string)
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Connection failed: {e}")
    print("\nPlease check your Supabase dashboard for the correct connection string.")
    print("The connection string should look like:")
    print("postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres")