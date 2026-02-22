import os
import random
import string
import requests
import json
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def generate_code():
    part1 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    part2 = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"{part1}-{part2}"

def insert_test_code():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Missing Supabase credentials in .env")
        return
        
    code = generate_code()
    print(f"Generated test code: {code}")
    
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }
    
    data = {
        'code': code,
        'order_id': 'test_order_123',
        'stripe_session_id': 'cs_test_simulate',
        'is_claimed': False,
        'art_slug': 'crete-verte' # using a valid slug
    }
    
    url = f"{SUPABASE_URL}/rest/v1/owners_legacy"
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code in (200, 201):
        print(f"Success! You can now test the claim flow with the code: {code}")
    else:
        print(f"Failed to insert: {response.status_code}")
        print(response.text)

if __name__ == '__main__':
    insert_test_code()
