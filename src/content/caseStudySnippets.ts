export type FailureStorySnippets = {
  scenario1: { scenario: string; outcome: string };
  scenario2: { scenario: string; systemBehavior: string };
  scenario3: { scenario: string; systemBehavior: string; outcome: string };
};

export const reliableEventingFailureSnippets: FailureStorySnippets = {
  scenario1: {
    scenario: `curl -s -X POST http://localhost:3000/events/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_id": "evt_duplicate_demo_1",
    "event_type": "subscription.paid",
    "payload": { "subscription_id": "sub_123" }
  }'
# => {"accepted": true}

curl -s -X POST http://localhost:3000/events/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_id": "evt_duplicate_demo_1",
    "event_type": "subscription.paid",
    "payload": { "subscription_id": "sub_123" }
  }'
# => {"accepted": true}`,
    outcome: `curl -s http://localhost:3000/admin/effects | jq
# => output
{
  "items": [
    {
      "id": "1",
      "idempotency_key": "activate_subscription:sub_123",
      "subscription_id": "sub_123",
      "status": "succeeded",
      "error_message": null,
      "created_at": "2026-02-09T10:32:29.301Z",
      "updated_at": "2026-02-09T10:32:29.303Z"
    }
  ],
  "limit": 50
}`,
  },
  scenario2: {
    scenario: `curl -s -X POST http://localhost:3000/events/ingest \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_id": "evt_malformed_demo_1",
    "event_type": "subscription.paid",
    "payload": {}
  }'
# => {"accepted": true}`,
    systemBehavior: `curl -s http://localhost:3000/admin/jobs | jq
# => output
{
  "items": [
    {
      "id": "1",
      "status": "failed",
      "event_ledger_id": "1",
      "event_type": "subscription.paid",
      "external_event_id": "evt_malformed_demo_1",
      "attempts": 1,
      "max_attempts": 3,
      "failure_type": "permanent",
      "last_error": "Malformed payload: missing subscription_id",
      "created_at": "2026-02-09T10:42:36.035Z"
    }
  ],
  "limit": 50
}`,
  },
  scenario3: {
    scenario: `curl -s http://localhost:3000/admin/jobs | jq
# => output
{
  "items": [
    {
      "id": "1",
      "status": "failed",
      "attempts": 1,
      "failure_type": "permanent",
      "last_error": "Malformed payload: missing subscription_id"
    }
  ]
}`,
    systemBehavior: `curl -s -X POST http://localhost:3000/admin/jobs/1/requeue \\
  -H "Content-Type: application/json" \\
  -d '{
    "actor": "admin@example.com",
    "reason": "manual retry to requeue job"
  }' | jq
# => output
{
  "ok": true,
  "id": "1",
  "status": "queued",
  "available_at": "2026-02-09T10:51:45.416Z",
  "audit": {
    "id": "1",
    "action": "manual_requeue",
    "actor": "admin@example.com",
    "reason": "manual retry to requeue job",
    "created_at": "2026-02-09T10:51:45.416Z"
  }
}`,
    outcome: `curl -s http://localhost:3000/admin/interventions | jq
# => output
{
  "items": [
    {
      "audit": {
        "id": "1",
        "job_id": "1",
        "action": "manual_requeue",
        "actor": "admin@example.com",
        "reason": "manual retry to requeue job",
        "created_at": "2026-02-09T11:04:31.714Z"
      }
    }
  ],
  "limit": 50
}`,
  },
};
