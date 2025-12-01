# Flutter API Guide pro ajtak.it

## Supabase Setup

### 1. Instalace balicku

```yaml
# pubspec.yaml
dependencies:
  supabase_flutter: ^2.0.0
  flutter_riverpod: ^2.4.0  # pro state management
```

### 2. Inicializace

```dart
// main.dart
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  await Supabase.initialize(
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
  );
  
  runApp(MyApp());
}

final supabase = Supabase.instance.client;
```

---

## Modely

### Customer Model

```dart
// lib/models/customer.dart
class Customer {
  final String id;
  final String name;
  final String? companyName;
  final String? email;
  final String? phone;
  final String? ico;
  final String? dic;
  final String? addressStreet;
  final String? addressCity;
  final String? addressZip;
  final String? notes;
  final List<String>? tags;
  final DateTime createdAt;
  final DateTime updatedAt;

  Customer({
    required this.id,
    required this.name,
    this.companyName,
    this.email,
    this.phone,
    this.ico,
    this.dic,
    this.addressStreet,
    this.addressCity,
    this.addressZip,
    this.notes,
    this.tags,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      id: json['id'],
      name: json['name'],
      companyName: json['company_name'],
      email: json['email'],
      phone: json['phone'],
      ico: json['ico'],
      dic: json['dic'],
      addressStreet: json['address_street'],
      addressCity: json['address_city'],
      addressZip: json['address_zip'],
      notes: json['notes'],
      tags: json['tags'] != null ? List<String>.from(json['tags']) : null,
      createdAt: DateTime.parse(json['created_at']),
      updatedAt: DateTime.parse(json['updated_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'company_name': companyName,
      'email': email,
      'phone': phone,
      'ico': ico,
      'dic': dic,
      'address_street': addressStreet,
      'address_city': addressCity,
      'address_zip': addressZip,
      'notes': notes,
      'tags': tags,
    };
  }
}
```

### ServiceOrder Model

```dart
// lib/models/service_order.dart
class ServiceOrder {
  final String id;
  final String? customerId;
  final String? deviceId;
  final String orderNumber;
  final String status;
  final String priority;
  final String reportedIssue;
  final String? diagnosis;
  final String? workDone;
  final DateTime receivedAt;
  final DateTime? estimatedCompletion;
  final DateTime? completedAt;
  final double? estimatedPrice;
  final double? finalPrice;
  final bool isPaid;
  final List<String>? photos;
  final String? notes;

  ServiceOrder({
    required this.id,
    this.customerId,
    this.deviceId,
    required this.orderNumber,
    required this.status,
    required this.priority,
    required this.reportedIssue,
    this.diagnosis,
    this.workDone,
    required this.receivedAt,
    this.estimatedCompletion,
    this.completedAt,
    this.estimatedPrice,
    this.finalPrice,
    this.isPaid = false,
    this.photos,
    this.notes,
  });

  factory ServiceOrder.fromJson(Map<String, dynamic> json) {
    return ServiceOrder(
      id: json['id'],
      customerId: json['customer_id'],
      deviceId: json['device_id'],
      orderNumber: json['order_number'],
      status: json['status'],
      priority: json['priority'],
      reportedIssue: json['reported_issue'],
      diagnosis: json['diagnosis'],
      workDone: json['work_done'],
      receivedAt: DateTime.parse(json['received_at']),
      estimatedCompletion: json['estimated_completion'] != null 
          ? DateTime.parse(json['estimated_completion']) 
          : null,
      completedAt: json['completed_at'] != null 
          ? DateTime.parse(json['completed_at']) 
          : null,
      estimatedPrice: json['estimated_price']?.toDouble(),
      finalPrice: json['final_price']?.toDouble(),
      isPaid: json['is_paid'] ?? false,
      photos: json['photos'] != null ? List<String>.from(json['photos']) : null,
      notes: json['notes'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'customer_id': customerId,
      'device_id': deviceId,
      'order_number': orderNumber,
      'status': status,
      'priority': priority,
      'reported_issue': reportedIssue,
      'diagnosis': diagnosis,
      'work_done': workDone,
      'estimated_completion': estimatedCompletion?.toIso8601String(),
      'estimated_price': estimatedPrice,
      'final_price': finalPrice,
      'is_paid': isPaid,
      'photos': photos,
      'notes': notes,
    };
  }
}
```

### Invoice Model

```dart
// lib/models/invoice.dart
class Invoice {
  final String id;
  final String? customerId;
  final String? serviceOrderId;
  final String invoiceNumber;
  final String variableSymbol;
  final String invoiceType;
  final double subtotal;
  final double vatRate;
  final double vatAmount;
  final double total;
  final String paymentMethod;
  final DateTime? dueDate;
  final DateTime? paidAt;
  final bool isPaid;
  final DateTime issueDate;
  final DateTime taxableDate;
  final String? notes;
  final List<InvoiceItem> items;

  Invoice({
    required this.id,
    this.customerId,
    this.serviceOrderId,
    required this.invoiceNumber,
    required this.variableSymbol,
    this.invoiceType = 'faktura',
    required this.subtotal,
    this.vatRate = 21.0,
    required this.vatAmount,
    required this.total,
    this.paymentMethod = 'prevod',
    this.dueDate,
    this.paidAt,
    this.isPaid = false,
    required this.issueDate,
    required this.taxableDate,
    this.notes,
    this.items = const [],
  });

  factory Invoice.fromJson(Map<String, dynamic> json) {
    return Invoice(
      id: json['id'],
      customerId: json['customer_id'],
      serviceOrderId: json['service_order_id'],
      invoiceNumber: json['invoice_number'],
      variableSymbol: json['variable_symbol'] ?? '',
      invoiceType: json['invoice_type'] ?? 'faktura',
      subtotal: json['subtotal'].toDouble(),
      vatRate: json['vat_rate']?.toDouble() ?? 21.0,
      vatAmount: json['vat_amount'].toDouble(),
      total: json['total'].toDouble(),
      paymentMethod: json['payment_method'] ?? 'prevod',
      dueDate: json['due_date'] != null ? DateTime.parse(json['due_date']) : null,
      paidAt: json['paid_at'] != null ? DateTime.parse(json['paid_at']) : null,
      isPaid: json['is_paid'] ?? false,
      issueDate: DateTime.parse(json['issue_date']),
      taxableDate: DateTime.parse(json['taxable_date']),
      notes: json['notes'],
    );
  }
}

class InvoiceItem {
  final String id;
  final String invoiceId;
  final String description;
  final double quantity;
  final String unit;
  final double unitPrice;
  final double totalPrice;

  InvoiceItem({
    required this.id,
    required this.invoiceId,
    required this.description,
    this.quantity = 1,
    this.unit = 'ks',
    required this.unitPrice,
    required this.totalPrice,
  });

  factory InvoiceItem.fromJson(Map<String, dynamic> json) {
    return InvoiceItem(
      id: json['id'],
      invoiceId: json['invoice_id'],
      description: json['description'],
      quantity: json['quantity'].toDouble(),
      unit: json['unit'] ?? 'ks',
      unitPrice: json['unit_price'].toDouble(),
      totalPrice: json['total_price'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'invoice_id': invoiceId,
      'description': description,
      'quantity': quantity,
      'unit': unit,
      'unit_price': unitPrice,
      'total_price': totalPrice,
    };
  }
}
```

---

## Repository / Services

### Customer Repository

```dart
// lib/repositories/customer_repository.dart
class CustomerRepository {
  final SupabaseClient _supabase;

  CustomerRepository(this._supabase);

  // Ziskat vsechny zakazniky
  Future<List<Customer>> getAll() async {
    final response = await _supabase
        .from('customers')
        .select()
        .order('name');
    
    return (response as List)
        .map((json) => Customer.fromJson(json))
        .toList();
  }

  // Vyhledat zakazniky
  Future<List<Customer>> search(String query) async {
    final response = await _supabase
        .from('customers')
        .select()
        .or('name.ilike.%$query%,email.ilike.%$query%,ico.ilike.%$query%')
        .order('name')
        .limit(20);
    
    return (response as List)
        .map((json) => Customer.fromJson(json))
        .toList();
  }

  // Ziskat jednoho zakaznika
  Future<Customer?> getById(String id) async {
    final response = await _supabase
        .from('customers')
        .select()
        .eq('id', id)
        .single();
    
    return Customer.fromJson(response);
  }

  // Vytvorit zakaznika
  Future<Customer> create(Customer customer) async {
    final response = await _supabase
        .from('customers')
        .insert(customer.toJson())
        .select()
        .single();
    
    return Customer.fromJson(response);
  }

  // Aktualizovat zakaznika
  Future<Customer> update(String id, Customer customer) async {
    final response = await _supabase
        .from('customers')
        .update(customer.toJson())
        .eq('id', id)
        .select()
        .single();
    
    return Customer.fromJson(response);
  }

  // Smazat zakaznika
  Future<void> delete(String id) async {
    await _supabase
        .from('customers')
        .delete()
        .eq('id', id);
  }
}
```

### ServiceOrder Repository

```dart
// lib/repositories/service_order_repository.dart
class ServiceOrderRepository {
  final SupabaseClient _supabase;

  ServiceOrderRepository(this._supabase);

  // Ziskat vsechny zakazky s filtrem
  Future<List<ServiceOrder>> getAll({
    String? status,
    String? customerId,
    int limit = 50,
  }) async {
    var query = _supabase
        .from('service_orders')
        .select('*, customers(name, email, phone)')
        .order('received_at', ascending: false)
        .limit(limit);
    
    if (status != null) {
      query = query.eq('status', status);
    }
    if (customerId != null) {
      query = query.eq('customer_id', customerId);
    }
    
    final response = await query;
    
    return (response as List)
        .map((json) => ServiceOrder.fromJson(json))
        .toList();
  }

  // Statistiky
  Future<Map<String, int>> getStatusCounts() async {
    final response = await _supabase
        .from('service_orders')
        .select('status');
    
    final counts = <String, int>{};
    for (final row in response) {
      final status = row['status'] as String;
      counts[status] = (counts[status] ?? 0) + 1;
    }
    return counts;
  }

  // Aktualizovat status
  Future<void> updateStatus(String id, String status) async {
    final updates = <String, dynamic>{'status': status};
    
    if (status == 'hotovo') {
      updates['completed_at'] = DateTime.now().toIso8601String();
    } else if (status == 'predano') {
      updates['handed_over_at'] = DateTime.now().toIso8601String();
    }
    
    await _supabase
        .from('service_orders')
        .update(updates)
        .eq('id', id);
  }

  // Nahrat foto
  Future<String> uploadPhoto(String orderId, Uint8List imageData) async {
    final fileName = '${orderId}_${DateTime.now().millisecondsSinceEpoch}.jpg';
    final path = 'service_orders/$orderId/$fileName';
    
    await _supabase.storage
        .from('photos')
        .uploadBinary(path, imageData);
    
    final url = _supabase.storage
        .from('photos')
        .getPublicUrl(path);
    
    // Pridat URL do zakazky
    await _supabase.rpc('append_to_array', params: {
      'table_name': 'service_orders',
      'row_id': orderId,
      'column_name': 'photos',
      'value': url,
    });
    
    return url;
  }
}
```

### Invoice Repository

```dart
// lib/repositories/invoice_repository.dart
class InvoiceRepository {
  final SupabaseClient _supabase;

  InvoiceRepository(this._supabase);

  // Vytvorit fakturu s polozkami
  Future<Invoice> createWithItems(Invoice invoice, List<InvoiceItem> items) async {
    // Ziskat nove cislo faktury
    final numberResponse = await _supabase
        .rpc('generate_document_number', params: {'doc_type': 'invoice'});
    
    final invoiceData = {
      ...invoice.toJson(),
      'invoice_number': numberResponse,
      'variable_symbol': numberResponse.replaceAll('-', ''),
    };
    
    final invoiceResponse = await _supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single();
    
    final invoiceId = invoiceResponse['id'];
    
    // Vlozit polozky
    if (items.isNotEmpty) {
      final itemsData = items.map((item) => {
        ...item.toJson(),
        'invoice_id': invoiceId,
      }).toList();
      
      await _supabase
          .from('invoice_items')
          .insert(itemsData);
    }
    
    return Invoice.fromJson(invoiceResponse);
  }

  // Oznacit jako zaplacenou
  Future<void> markAsPaid(String id) async {
    await _supabase
        .from('invoices')
        .update({
          'is_paid': true,
          'paid_at': DateTime.now().toIso8601String(),
        })
        .eq('id', id);
  }
}
```

---

## Riverpod Providers

```dart
// lib/providers/providers.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Supabase client
final supabaseProvider = Provider((ref) => Supabase.instance.client);

// Repositories
final customerRepositoryProvider = Provider((ref) {
  return CustomerRepository(ref.watch(supabaseProvider));
});

final serviceOrderRepositoryProvider = Provider((ref) {
  return ServiceOrderRepository(ref.watch(supabaseProvider));
});

final invoiceRepositoryProvider = Provider((ref) {
  return InvoiceRepository(ref.watch(supabaseProvider));
});

// Async data
final customersProvider = FutureProvider((ref) {
  return ref.watch(customerRepositoryProvider).getAll();
});

final serviceOrdersProvider = FutureProvider.family<List<ServiceOrder>, String?>((ref, status) {
  return ref.watch(serviceOrderRepositoryProvider).getAll(status: status);
});

// Realtime subscription
final serviceOrdersStreamProvider = StreamProvider((ref) {
  final supabase = ref.watch(supabaseProvider);
  
  return supabase
      .from('service_orders')
      .stream(primaryKey: ['id'])
      .order('received_at', ascending: false)
      .map((data) => data.map((json) => ServiceOrder.fromJson(json)).toList());
});
```

---

## Priklad UI - Seznam zakazek

```dart
// lib/screens/service_orders_screen.dart
class ServiceOrdersScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ordersAsync = ref.watch(serviceOrdersStreamProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Servisni zakazky'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => _createNewOrder(context),
          ),
        ],
      ),
      body: ordersAsync.when(
        loading: () => Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(child: Text('Chyba: $error')),
        data: (orders) => ListView.builder(
          itemCount: orders.length,
          itemBuilder: (context, index) {
            final order = orders[index];
            return ServiceOrderCard(order: order);
          },
        ),
      ),
    );
  }
}

class ServiceOrderCard extends StatelessWidget {
  final ServiceOrder order;
  
  const ServiceOrderCard({required this.order});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        leading: _buildStatusIcon(order.status),
        title: Text(order.orderNumber),
        subtitle: Text(order.reportedIssue, maxLines: 2, overflow: TextOverflow.ellipsis),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(_formatDate(order.receivedAt), style: TextStyle(fontSize: 12)),
            Chip(
              label: Text(order.status.toUpperCase(), style: TextStyle(fontSize: 10)),
              backgroundColor: _getStatusColor(order.status),
            ),
          ],
        ),
        onTap: () => _openDetail(context, order),
      ),
    );
  }
  
  Color _getStatusColor(String status) {
    switch (status) {
      case 'prijato': return Colors.blue[100]!;
      case 'diagnostika': return Colors.orange[100]!;
      case 'oprava': return Colors.amber[100]!;
      case 'hotovo': return Colors.green[100]!;
      case 'predano': return Colors.grey[300]!;
      default: return Colors.grey[100]!;
    }
  }
}
```

---

## Autentizace

```dart
// lib/services/auth_service.dart
class AuthService {
  final SupabaseClient _supabase;

  AuthService(this._supabase);

  // Email login
  Future<AuthResponse> signInWithEmail(String email, String password) async {
    return await _supabase.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  // Magic link
  Future<void> signInWithMagicLink(String email) async {
    await _supabase.auth.signInWithOtp(
      email: email,
      emailRedirectTo: 'io.supabase.ajtakit://login-callback/',
    );
  }

  // Sign out
  Future<void> signOut() async {
    await _supabase.auth.signOut();
  }

  // Auth state stream
  Stream<AuthState> get authStateChanges {
    return _supabase.auth.onAuthStateChange;
  }

  // Current user
  User? get currentUser => _supabase.auth.currentUser;
}
```

---

## Offline Podpora (bonus)

Pro offline-first pristup pouzij:

```yaml
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  connectivity_plus: ^5.0.0
```

```dart
// lib/services/sync_service.dart
class SyncService {
  final Box _pendingChangesBox;
  final SupabaseClient _supabase;

  // Ulozit zmenu offline
  Future<void> queueChange(String table, String action, Map<String, dynamic> data) async {
    await _pendingChangesBox.add({
      'table': table,
      'action': action, // 'insert', 'update', 'delete'
      'data': data,
      'timestamp': DateTime.now().toIso8601String(),
    });
  }

  // Synchronizovat pri pripojeni
  Future<void> syncPendingChanges() async {
    final pending = _pendingChangesBox.values.toList();
    
    for (final change in pending) {
      try {
        switch (change['action']) {
          case 'insert':
            await _supabase.from(change['table']).insert(change['data']);
            break;
          case 'update':
            await _supabase.from(change['table']).update(change['data']).eq('id', change['data']['id']);
            break;
          case 'delete':
            await _supabase.from(change['table']).delete().eq('id', change['data']['id']);
            break;
        }
        // Smazat po uspesne synchronizaci
        await _pendingChangesBox.deleteAt(pending.indexOf(change));
      } catch (e) {
        print('Sync failed for: $change');
      }
    }
  }
}
```

---

## Deep Links (pro otevrani z notifikaci)

```dart
// AndroidManifest.xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="ajtakit" android:host="order" />
</intent-filter>

// Pouziti: ajtakit://order/uuid-zakazky
```

---

## Souhrn

1. **Setup Supabase** - URL + anon key
2. **Modely** - Customer, ServiceOrder, Invoice, ...
3. **Repository** - CRUD operace
4. **Riverpod** - state management
5. **Realtime** - stream pro live updaty
6. **Offline** - Hive + sync queue
