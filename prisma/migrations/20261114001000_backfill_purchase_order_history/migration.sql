INSERT INTO "Activity" (
  "id",
  "entityType",
  "action",
  "note",
  "createdAt",
  "updatedAt",
  "purchaseOrderId"
)
SELECT
  md5(random()::text || clock_timestamp()::text || po."id"::text),
  'PURCHASE_ORDER',
  'CREATED',
  'Commande d''achat créée.',
  po."createdAt",
  po."createdAt",
  po."id"
FROM "PurchaseOrder" po
WHERE NOT EXISTS (
  SELECT 1
  FROM "Activity" activity
  WHERE activity."purchaseOrderId" = po."id"
);
